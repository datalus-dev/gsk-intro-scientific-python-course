---
title: Module 08: Data Modeling with statsmodels
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

# Module 08: Data Modeling with statsmodels

October 19, 2026

---

Content covered:

1. statsmodels
   1. Regression
   2. Formulas with formulaic
   3. Logistic regression

---

By the end of this class, you will be able to:

- Fit and interpret a regression model with statsmodels
- Build a model's inputs from a formula with formulaic
- Fit and interpret a logistic regression model with statsmodels

---

## <!-- fit -->1. Review

---

## Things We've Covered

- Python basics: strings, lists, dictionaries, loops, functions, classes
- NumPy: `ndarray` and random number generators
- Matplotlib: `fig, ax = plt.subplots()`
- Pandas: DataFrames, `.iloc` and `.loc`, `groupby`, `.rename()`
- Seaborn: statistical plots on DataFrames
- SciPy: correlation and t-tests

In Module 7 we asked whether two variables are related. Today we *model* the relationship.

---

## Open Today's Notebook

We'll use this notebook, `notebooks/module_08.ipynb`, for the rest of class.

First, bring it into your `personal` branch (recall Module 5):

```bash
git switch main
git pull upstream main
git switch personal
git rebase main
```

Then open `notebooks/module_08.ipynb` in Jupyter Lab. It has today's code and a cell for each practice question.

---

## Install formulaic

Today we use `formulaic`, a library for writing model formulas. It's not in the environment you created in Module 1, so let's add it.

In your terminal:

```bash
conda activate gsk
conda install formulaic
```

Type `y` when `conda` asks to proceed. New installs of the course environment already include it, since `environment.yml` now lists it.

---

## Picking Up Where We Left Off

We'll keep working with the Gapminder data. We will add new columns to the dataframe: the log of GDP that we used in Module 7, and the log of population.

```python
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

df = pd.read_csv('data/gapminder.tsv', sep='\t')
df = df.rename(columns={'lifeExp': 'life_expectancy', 'gdpPercap': 'gdp_per_capita'})
df['log_gdp'] = np.log10(df['gdp_per_capita'])
df['log_pop'] = np.log10(df['pop'])
df_2007 = df.query("year == 2007")
```

---

## <!-- fit -->2. statsmodels

---

## statsmodels

statsmodels is a library for fitting statistical models and understanding the results. It's already installed in our `gsk` conda environment.

By convention, we import its main interface as `sm`.

```python
import statsmodels.api as sm
```

It gives us detailed tables of coefficients, p-values, and confidence intervals, the kind of output you would get from R.

---

## From Correlation to Regression

A correlation tells us *how strongly* two variables are related. A **regression** fits a line through the data, so we can say *how much* one changes with the other.

```python
sns.regplot(data=df_2007, x='log_gdp', y='life_expectancy')
```

The line is `life_expectancy = intercept + slope * log_gdp`.

This is **ordinary least squares (OLS)**: the line that makes the squared distances to the points as small as possible.

---

## Formulas with formulaic

<style scoped>section { font-size: 26px; }</style>

statsmodels wants our data as two pieces: the outcome `y` and a table of predictors `X`, called the **design matrix**.

`formulaic` builds both from a *formula*. `~` reads as "is modeled by".

```python
from formulaic import model_matrix

y, X = model_matrix('life_expectancy ~ log_gdp', df_2007)
X.head()
```

`X` has our `log_gdp` column and an `Intercept` column of 1s, which gives the line its starting height.

Formulas include an `Intercept` by default.

---

## Fitting OLS

<style scoped>section { font-size: 24px; }</style>

```python
model = sm.OLS(y, X)
results = model.fit()
print(results.summary())
```

`sm.OLS()` sets up the model, and `.fit()` finds the best line.

statsmodels also has a shortcut, `smf.ols('life_expectancy ~ log_gdp', data=df_2007)` from `statsmodels.formula.api`, which takes the formula directly. You will see it in many tutorials.

By convention, we import it as `smf`.

```python
import statsmodels.formula.api as smf

model = smf.ols('life_expectancy ~ log_gdp', data=df_2007)
results = model.fit()
```

---

## Reading the Summary

<style scoped>section { font-size: 24px; }</style>

```
                 coef    std err          t      P>|t|      [0.025      0.975]
Intercept      4.9496      3.858      1.283      0.202      -2.677      12.576
log_gdp       16.5851      1.019     16.283      0.000      14.571      18.599
```

- `coef`: the slope is 16.6. Each 10x increase in GDP per capita goes with 16.6 more years of life expectancy
- `P>|t|`: the p-value for each coefficient, like we saw in Module 7
- `[0.025 0.975]`: the 95% confidence interval for each coefficient

The 10x is because `log_gdp` is `np.log10` of GDP per capita, so each 1-unit step in `log_gdp` is a 10x change in GDP.

At the top, `R-squared` is 0.654: the model explains about 65% of the variation in life expectancy.

---

## Adding a Predictor

<style scoped>section { font-size: 24px; }</style>

We can add more predictors with `+`. Let's also use `continent`, wrapped in `C()` to tell `formulaic` it is a category.

Text columns are treated as categories automatically. `C()` makes it explicit, and is needed for numbers like `year`.

```python
y, X = model_matrix('life_expectancy ~ log_gdp + C(continent)', df_2007)
results = sm.OLS(y, X).fit()
print(results.summary())
```

`R-squared` goes from 0.654 to 0.767. Africa is the baseline, and each continent's coefficient is how many more years it has than Africa at the same GDP.

The `log_gdp` coefficient drops from 16.6 to 10.7. Part of what GDP seemed to explain was really continent.

---

## How `continent` Is Coded

<style scoped>section { font-size: 24px; }</style>

`C(continent)` turns the category into **dummy variables**: 0/1 columns, where a 1 means "this country is in that continent".

Here are five rows of `X`, one country from each continent:

| column | Afghanistan | Albania | Algeria | Argentina | Australia |
|---|---|---|---|---|---|
| (continent) | Asia | Europe | Africa | Americas | Oceania |
| `Intercept` | 1 | 1 | 1 | 1 | 1 |
| `log_gdp` | 2.99 | 3.77 | 3.79 | 4.11 | 4.54 |
| `C(continent)[T.Americas]` | 0 | 0 | 0 | 1 | 0 |
| `C(continent)[T.Asia]` | 1 | 0 | 0 | 0 | 0 |
| `C(continent)[T.Europe]` | 0 | 1 | 0 | 0 | 0 |
| `C(continent)[T.Oceania]` | 0 | 0 | 0 | 0 | 1 |

---

## Why Africa Is Left Out

There are five continents but only four columns. Africa is left out, so a country in Africa has a 0 in all four. That makes Africa the baseline that the others are compared to. A fifth column would just repeat the `Intercept`, so `formulaic` leaves one out, the first alphabetically. The `T` stands for "treatment" coding.

---

## Practice (5 min)

Let's work on these questions:

1. Fit `life_expectancy ~ log_gdp` on `df_1952 = df.query("year == 1952")`. Is the slope bigger or smaller than in 2007?
2. Fit `life_expectancy ~ log_gdp + log_pop` on `df_2007`. Is the `log_pop` coefficient significant?
3. What is the `R-squared` of each model?

---

## <!-- fit -->3. Logistic Regression

---

## Classification

Regression predicts a number. **Classification** predicts a category.

Let's ask a yes/no question: does a country have a high life expectancy, meaning above the median in 2007?

```python
median = df_2007['life_expectancy'].median()
df_2007 = df_2007.assign(high_life_exp=(df_2007['life_expectancy'] > median).astype(int))
```

`high_life_exp` is `1` for yes and `0` for no, and the two classes are evenly split, by construction.

---

## Logistic Regression

A straight line can't predict a yes/no outcome, because it can go below 0 or above 1. **Logistic regression** models the *probability* of a yes with an S-shaped curve.

```python
y, X = model_matrix('high_life_exp ~ log_gdp', df_2007)
results = sm.Logit(y, X).fit()
print(results.summary())
```

`sm.Logit()` works like `sm.OLS()`: we give it the same `y` and `X`.

---

## Reading the Logit Summary

<style scoped>section { font-size: 24px; }</style>

```
                 coef    std err          z      P>|z|      [0.025      0.975]
Intercept    -20.3823      3.385     -6.022      0.000     -27.017     -13.748
log_gdp        5.4085      0.890      6.080      0.000       3.665       7.152
```

- `coef`: these are in log-odds. A positive coefficient means a higher `log_gdp` makes a *high* life expectancy more likely
- `np.exp(results.params['log_gdp'])` turns it into an odds ratio: each 10x increase in GDP per capita multiplies the odds by about 223
- `P>|z|`: the p-value for each coefficient, as in OLS

At the top, `Pseudo R-squ.` is 0.569, the logistic version of `R-squared`.

---

## Predicted Probabilities

`results.predict()` gives the probability of a yes for each row of `X`.

Let's try countries with a GDP per capita of $1,000, about $3,200, and $10,000:

```python
new = pd.DataFrame({'Intercept': 1, 'log_gdp': [3, 3.5, 4]})
results.predict(new)
```

```
0.015    0.190    0.778
```

A $1,000 country has a 1.5% chance of a high life expectancy, and a $10,000 country has a 78% chance.

---

## Checking the Predictions

<style scoped>section { font-size: 24px; }</style>

To get a yes or a no, we call a probability above 0.5 a yes.

```python
predicted = (results.predict(X) > 0.5).astype(int)
(predicted == df_2007['high_life_exp']).mean()
pd.crosstab(df_2007['high_life_exp'], predicted)
```

```
0.887

col_0            0   1
high_life_exp
0               62   9
1                7  64
```

The model is right for 126 of 142 countries. Rows are the true class and columns are the predicted class. The 9 and 7 are the mistakes.

This scores the model on the same countries it was fit on. In Module 9 we hold some countries back to test on.

---

## Practice (5 min)

Let's work on these questions:

1. Fit `high_life_exp ~ log_gdp + log_pop`. Is the `log_pop` coefficient significant?
2. Make a column `africa` that is `1` for countries in Africa and `0` otherwise, and fit `africa ~ log_gdp`. Is the `log_gdp` coefficient positive or negative? What does that mean?
3. Use `results.predict()` to find the probability of a high life expectancy for a country with a GDP per capita of $5,000. Hint: use `np.log10(5000)`.

---

## Save Your Work

Commit and push your notes from today on your `personal` branch:

```bash
git add notebooks/module_08.ipynb
git commit -m "Module 8 notes"
git push --force-with-lease origin personal
```

---

## <!-- fit --> That's it for today!
