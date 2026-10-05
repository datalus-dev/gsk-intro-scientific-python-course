---
title: Module 07 Supplement: SciPy with RNA-seq
marp: true
html: true
theme: gaia
footer: Intro to Scientific Python
---
<style>
    footer {
    text-align: right;
    }
    h2 {
        text-align: center;
        }
    pre {
        position: relative;
        margin: 0 0 8px 0;
    }
    .copy-btn {
        position: absolute;
        top: 6px;
        right: 6px;
        font-size: 12px;
        padding: 2px 10px;
        cursor: pointer;
        background: rgba(255, 255, 255, 0.15);
        border: 1px solid rgba(255, 255, 255, 0.4);
        color: #fff;
        border-radius: 4px;
    }
    .copy-btn:hover {
        background: rgba(255, 255, 255, 0.3);
    }
    @media print {
        .copy-btn, iframe {
            display: none;
        }
    }
</style>

<script>
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('pre, marp-pre, [is="marp-pre"]').forEach((pre) => {
        const btn = document.createElement('button');
        btn.textContent = 'Copy';
        btn.className = 'copy-btn';
        btn.addEventListener('click', () => {
            navigator.clipboard.writeText(pre.innerText.replace(/Copy$/, '')).then(() => {
                btn.textContent = 'Copied!';
                setTimeout(() => { btn.textContent = 'Copy'; }, 1500);
            });
        });
        pre.appendChild(btn);
    });
});
</script>

# Module 07 Supplement: SciPy with RNA-seq

Correlation and t-tests on the RNA-seq data from Assignment 3

---

This supplement repeats Module 07 with a different dataset, so you can practice on your own.

By the end, you will be able to:

- Use a log transform to make count data easier to compare
- Run and interpret a correlation between RNA-seq samples
- Run and interpret a t-test on the expression of a gene

---

## Open the Supplement Notebook

We'll use `notebooks/module_07_rnaseq.ipynb`. Bring it into your `personal` branch first (recall Module 5):

```bash
git switch main
git pull upstream main
git switch personal
git rebase main
```

---

## <!-- fit -->1. The Data

---

## RNA-seq Counts

RNA-seq measures how active each gene is in a sample by counting the sequencing reads that map to it.

Our file has read counts for the genes on chromosome 1, from three cell types (`FB`, `HSC`, and `TREG`) with two replicates of each (`_1` and `_2`).

---

## Loading the Data

```python
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
from scipy import stats

df = pd.read_csv('data/RNAcountTable_chr1_geneNames.tsv', sep='\t')
df = df.rename(columns={'Gene': 'gene'})
```

---

## Counts Span Orders of Magnitude

```python
samples = ['FB_1', 'FB_2', 'HSC_1', 'HSC_2', 'TREG_1', 'TREG_2']

df[samples].describe()
```

The median count in `FB_1` is 2, but the maximum is over 180,000. A handful of genes dominate, like wealth in Module 07.

Just as we did with GDP, we'll use a log transform.

---

## Log Transform

Log-transform the counts so that the genes are comparable. We add 1 first, because the log of 0 is undefined and many genes have a count of 0.

```python
log_counts = np.log2(df.set_index('gene')[samples] + 1)
```

Genes with no reads in any sample carry no information, so let's drop them:

```python
expressed = df[samples].sum(axis=1) > 0
log_counts = log_counts[expressed.to_numpy()]
log_counts.shape
```

---

## <!-- fit -->2. Correlation

---

## Do Replicates Agree?

Replicates are two samples from the same cell type. If the experiment worked, their expression should be strongly correlated.

```python
sns.scatterplot(data=log_counts, x='FB_1', y='FB_2', s=10)
```

```python
stats.pearsonr(log_counts['FB_1'], log_counts['FB_2'])
```

`r` is 0.96. The replicates agree closely.

---

## Raw Counts vs. Log Counts

On raw counts, `r` is 0.99. That looks even better, but it's misleading.

```python
raw = df.set_index('gene')[samples][expressed.to_numpy()]
stats.pearsonr(raw['FB_1'], raw['FB_2'])
```

A few genes with huge counts dominate the raw correlation. On the log scale, every gene counts, including the many lowly expressed ones.

---

## Pearson and Spearman

Spearman compares ranks, so it is not affected by the huge counts.

```python
stats.spearmanr(raw['FB_1'], raw['FB_2'])
```

Even on raw counts, Spearman gives 0.94, close to Pearson's 0.96 on the log counts.

When your data is skewed, either a log transform or Spearman can help.

---

## Replicates vs. Different Cell Types

```python
stats.pearsonr(log_counts['FB_1'], log_counts['HSC_1'])
```

`r` drops to 0.82. Two different cell types still share many genes (cells all need the same basic machinery), but they differ more than replicates do.

---

## A Correlation Matrix

`.corr()` computes the correlation between every pair of columns.

```python
corr = log_counts.corr()

sns.heatmap(corr, annot=True, fmt='.2f', vmin=0.7, vmax=1)
```

Q: Do the replicates cluster together? Which two cell types are the most similar?

---

## Practice (5 min)

Let's work on these questions:

1. Make a scatterplot of `HSC_1` against `HSC_2` and compute their correlation.
2. Which pair has the higher correlation, `FB_1` vs. `HSC_1` or `TREG_1` vs. `HSC_1`?
3. Compute the Spearman correlation for the pair in question 2. Is it similar to Pearson's?

---

## <!-- fit -->3. T-tests

---

## Is a Gene Expressed Differently?

Is the gene `Fcmr` expressed differently in `FB` than in `HSC`? Each cell type has two replicates.

```python
gene = log_counts.loc['Fcmr']

fb = gene[['FB_1', 'FB_2']]
hsc = gene[['HSC_1', 'HSC_2']]

fb.mean(), hsc.mean()
```

The means of the log2 counts are 17.7 and 6.4.

---

## A t-test on One Gene

```python
stats.ttest_ind(fb, hsc)
```

```
TtestResult(statistic=5.16, pvalue=0.036, df=2.0)
```

The p-value is below 0.05, so `Fcmr` is expressed differently in `FB` and `HSC`.

`df=2.0` is our degrees of freedom. With only 2 replicates per group, we have very little data to estimate the spread from.

---

## Writing a Helper Function

We can reuse our code with a function, like in Module 2.

```python
def compare(gene, a, b):
    values = log_counts.loc[gene]
    return stats.ttest_ind(values[a], values[b]).pvalue

compare('Sell', ['FB_1', 'FB_2'], ['HSC_1', 'HSC_2'])
compare('Ptprc', ['FB_1', 'FB_2'], ['HSC_1', 'HSC_2'])
```

`Sell` has a p-value of 0.013. `Ptprc` has a p-value of 0.053, just above 0.05.

---

## "Not Significant" Is Not "No Difference"

`Ptprc` has a p-value of 0.053, not far from `Sell`'s. But 0.05 is a convention, not a cliff.

With 2 replicates per group, the test has little power. A small sample can miss a real difference.

In practice, RNA-seq studies use more replicates.

---

## Testing Every Gene

We can test every gene at once. `axis=1` runs the test across the columns of each row.

```python
result = stats.ttest_ind(
    log_counts[['FB_1', 'FB_2']],
    log_counts[['HSC_1', 'HSC_2']],
    axis=1,
)
pvalues = pd.Series(result.pvalue, index=log_counts.index)

(pvalues < 0.05).sum()
```

You may see a `RuntimeWarning` for genes with almost identical values. It's safe to ignore here.

---

## The Problem with Many Tests

About 280 of the roughly 1,200 genes have a p-value below 0.05.

But if we run 1,200 tests, we expect about 5% of them, around 60, to fall below 0.05 *just by chance*.

This is called the **multiple testing** problem. Tools built for RNA-seq, e.g. DESeq2 and edgeR, correct for it. For now, remember that a p-value of 0.05 means less when you've looked at many genes.

---

## Practice (5 min)

Let's work on these questions:

1. Use `compare()` to test `Ptprc` between `TREG` and `HSC`. Is it significant?
2. Make a bar plot or a strip plot of `Ptprc` across all six samples to see the pattern.
3. How many genes have a p-value below 0.01? How does that compare with the number you'd expect by chance?

---

## Exercise

Let's explore the RNA-seq data with what we learned.

- Pick a pair of cell types and compute the correlation between their mean log counts
- Test the genes `Fcmr`, `Sell`, and `Ptprc` between `FB` and `TREG`
- In a Markdown cell, write a short summary of your findings, including a caution about the number of replicates

---

## Save Your Work

Commit and push your notes on your `personal` branch:

```bash
git add notebooks/module_07_rnaseq.ipynb
git commit -m "Module 7 RNA-seq supplement notes"
git push --force-with-lease origin personal
```

---

## <!-- fit --> That's it!
