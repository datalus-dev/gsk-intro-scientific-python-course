---
# title: Module 06: Pandas, continued, and Intro to Seaborn
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

# Module 06: Pandas, continued, and Intro to Seaborn

September 30, 2026

---

Content covered:

1. Pandas, continued
2. Intro to Seaborn

---

By the end of this class, you will be able to:

- Produce a basic statistical plot in Seaborn

---

## <!-- fit -->1. Pandas, continued

---

## <!-- fit -->2. Intro to Seaborn

---

## Seaborn

Seaborn is a high-level visualization library that works on top of matplotlib.

It makes common statistical plots, e.g. distributions and comparisons between groups, quick to make and nice to look at.

Seaborn is already installed in our `gsk` conda environment.

---

## Seaborn, cont.

By convention, we import seaborn as `sns`.

```python
import seaborn as sns
```

TIL: `sns` comes from an inside joke about West Wing and the character, Samuel Norman Seaborn.

ref: https://github.com/mwaskom/seaborn/issues/229

---

## A Basic Statistical Plot

`sns.histplot()` plots the distribution of your data. `kde=True` adds a smoothed estimate of the distribution on top.

```python
rng = np.random.default_rng(seed=42)
measurements = rng.normal(loc=100, scale=15, size=1_000)

sns.histplot(x=measurements, kde=True)
```

---

## Seaborn and Matplotlib Together

Seaborn lets us conveniently make plots and we can pass a matplotlib `Axes` to target the location of the plots.

```python
fig, axes = plt.subplots(1, 2, figsize=(8, 3), layout='constrained')
sns.histplot(x=measurements, ax=axes[0])
sns.kdeplot(x=measurements, ax=axes[1])
axes[0].set_title('Histogram')
axes[1].set_title('KDE')
```

The Axes methods we learned, e.g. `.set_title()`, still work on seaborn plots.

---

## Comparing Groups

Pass a 2-d array to `data`, and seaborn treats each column as a group:

```python
groups = rng.normal(loc=[0, 1, 2], scale=1, size=(200, 3))

fig, axes = plt.subplots(1, 2, figsize=(8, 3), layout='constrained')
sns.boxplot(data=groups, ax=axes[0])
sns.violinplot(data=groups, ax=axes[1])
```

`loc=[0, 1, 2]` gives each column a different mean, a nice use of broadcasting from Module 3.

---

## Practice (5 min)

Let's work on these questions:

1. Simulate rolling two dice 10,000 times, like in Module 3, and plot the distribution of the sum with `sns.histplot(..., discrete=True)`.
2. Simulate three groups with different standard deviations and compare them with `sns.boxplot()` and `sns.violinplot()` side by side.
3. Label your axes, add a figure title, and save your figure.

---

## <!-- fit --> That's it for today!
