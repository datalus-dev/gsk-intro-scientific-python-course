---
# title: Module 09: Machine Learning with scikit-learn and Agentic Programming
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

# Module 09: Machine Learning with scikit-learn and Agentic Programming

October 21, 2026

---

Content covered:

1. scikit-learn
   1. Regression
   2. Classification
2. Agentic Programming

---

By the end of this class, you will be able to:

- Train and evaluate a regression model with scikit-learn
- Train and evaluate a basic classification model with scikit-learn
- Plan a task with an agentic programming tool, and review the code it writes

---

## <!-- fit -->1. Review

---

## Things We've Covered

<style scoped>section { font-size: 28px; }</style>

- Python basics: strings, lists, dictionaries, loops, functions, classes
- NumPy: `ndarray` and random number generators
- Matplotlib: `fig, ax = plt.subplots()`
- Pandas: DataFrames, `.iloc` and `.loc`, `groupby`, `.rename()`
- Seaborn: statistical plots on DataFrames
- SciPy: correlation and t-tests
- statsmodels: regression and logistic regression, with formulas from `formulaic`

In Module 8 we fit models to *explain* the data. Today we use models to *predict* data they haven't seen.

---

## Open Today's Notebook

We'll use this notebook, `notebooks/module_09.ipynb`, for the rest of class.

First, bring it into your `personal` branch (recall Module 5):

```bash
git switch main
git pull upstream main
git switch personal
git rebase main
```

Then open `notebooks/module_09.ipynb` in Jupyter Lab. It has today's code and a cell for each practice question.

---

## Picking Up Where We Left Off

We'll keep working with the Gapminder data, with the same new columns as Module 8.

```python
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
from formulaic import model_matrix

df = pd.read_csv('data/gapminder.tsv', sep='\t')
df = df.rename(columns={'lifeExp': 'life_expectancy', 'gdpPercap': 'gdp_per_capita'})
df['log_gdp'] = np.log10(df['gdp_per_capita'])
df['log_pop'] = np.log10(df['pop'])
df_2007 = df.query("year == 2007")
```

---

## <!-- fit -->2. scikit-learn

---

## scikit-learn

<style scoped>section { font-size: 22px; }</style>

scikit-learn is a library for machine learning. It's also already installed in our `gsk` environment, and is imported as `sklearn`.

statsmodels and scikit-learn can fit the same line, but they have different goals:

- statsmodels is for **explaining**: what is the effect, and how sure are we?
- scikit-learn is for **predicting**: how well does the model do on data it hasn't seen?

Every scikit-learn model follows the same pattern: create it, `.fit()` it, `.predict()` with it.

---

## Features and Target

scikit-learn calls the predictors the **features**, `X`, and the outcome the **target**, `y`.

```python
X = df_2007[['log_gdp']]
y = df_2007['life_expectancy']
```

Notice the double brackets: `X` must be a DataFrame, which is 2-dimensional, even with one feature. `y` is a Series.

---

## Fit and Predict

```python
from sklearn.linear_model import LinearRegression

model = LinearRegression()
model.fit(X, y)

predictions = model.predict(X)
```

`.fit()` learns from the data. `.predict()` gives a predicted life expectancy for each country.

The learned line is stored on the model:

```python
model.intercept_, model.coef_
```

---

## The Same Line as statsmodels

<style scoped>section { font-size: 22px; }</style>

```
intercept_ = 4.95
coef_      = [16.59]
```

Fit the same model with statsmodels, as we did in Module 8:

```python
ols_model = smf.ols('life_expectancy ~ log_gdp', data=df_2007)
results = ols_model.fit()
print(results.summary())
```

`results.params` gets just the coefficients from the summary: an intercept of 4.95 and a slope of 16.59.

They are identical. It is the same method, ordinary least squares, on the same data. Fit on all the data, scikit-learn and statsmodels give the same line.

Recap: `smf.ols` with a formula adds an intercept automatically. With scikit-learn we use the columns directly, and it fits an intercept automatically too.

---

## Train and Test Split

<style scoped>section { font-size: 26px; }</style>

A model will always look good on the data it learned from. To check whether it works on new data, we hold some back.

```python
from sklearn.model_selection import train_test_split

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)
```

- The model learns from the **train** set, 80% of the countries
- We judge it on the **test** set, the other 20%
- `random_state` makes the random split the same every time

---

## Fit on the Train Set

```python
model = LinearRegression()
model.fit(X_train, y_train)

predictions = model.predict(X_test)
```

`.predict()` now gives a predicted life expectancy for each test country, which the model has never seen.

```
intercept_ = 5.03
coef_      = [16.55]
```

The line is close to the one above but not identical, because the model only saw 80% of the countries.

---

## Evaluating the Model

<style scoped>section { font-size: 26px; }</style>

How good are the predictions on the test set?

```python
from sklearn.metrics import r2_score, mean_squared_error

r2_score(y_test, predictions)
mean_squared_error(y_test, predictions) ** 0.5
```

- `r2_score` is R², now measured on unseen data: 0.72
- The square root of `mean_squared_error` is the **RMSE**: 6.4 years. A typical prediction is off by about this much

`model.score(X_test, y_test)` is a shortcut for R².

---

## Practice (5 min)

Let's work on these questions:

1. Train a `LinearRegression` with both `log_gdp` and `log_pop` as features. Use `X = df_2007[['log_gdp', 'log_pop']]`.
2. Does the test R² go up compared to using `log_gdp` alone?
3. Change `random_state` in `train_test_split` to another number. How much does the test R² change? What does that tell you about a small test set?

---

## Classification

Regression predicts a number. **Classification** predicts a category.

In Module 8 we asked a yes/no question with a logistic regression in statsmodels: does a country have a high life expectancy, meaning above the median in 2007? Let's ask it again with scikit-learn.

```python
median = df_2007['life_expectancy'].median()
df_2007 = df_2007.assign(high_life_exp=(df_2007['life_expectancy'] > median).astype(int))
```

`high_life_exp` is `1` for yes and `0` for no, and the two classes are evenly split, by construction.

---

## Logistic Regression

<style scoped>section { font-size: 24px; }</style>

`LogisticRegression` is a classifier. Despite the name, it predicts a category, using the same create, fit, predict pattern.

```python
from sklearn.linear_model import LogisticRegression

X = df_2007[['log_gdp']]
y = df_2007['high_life_exp']
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42, stratify=y
)

clf = LogisticRegression()
clf.fit(X_train, y_train)
clf.predict(X_test)
```

`stratify=y` keeps the same share of yes and no in train and test.

---

## Accuracy and the Confusion Matrix

<style scoped>section { font-size: 22px; }</style>

```python
from sklearn.metrics import accuracy_score, confusion_matrix

predictions = clf.predict(X_test)
accuracy_score(y_test, predictions)
confusion_matrix(y_test, predictions)
```

```
0.828
[[13  2]
 [ 3 11]]
```

**Accuracy** is the share of correct predictions: 24 of 29. The **confusion matrix** shows how: rows are the true class, columns are the predicted class. The 2 and 3 are the mistakes.

Accuracy alone can mislead when classes are lopsided. If 95% of countries were "no", always guessing "no" would be 95% accurate.

In Module 8, statsmodels scored 0.887 on the same countries it was fit on. Here we score on countries the model hasn't seen, so 0.83 is the more honest number.

---

## Practice (5 min)

Let's work on these questions:

1. Add `continent` as a feature. Use `model_matrix('~ log_gdp + C(continent)', df_2007)` which returns just `X` since the formula has no outcome, and drop its `Intercept` column.
2. Does the accuracy go up?
3. Use `clf.predict_proba(X_test)` to see the probabilities behind the predictions. Which test country was the model least sure about?

---

## <!-- fit -->3. Agentic Programming

---

## What is an Agentic Programming Tool?

<style scoped>section { font-size: 26px; }</style>

A chatbot gives you code to copy and paste. An **agentic programming tool** works inside your project. It reads your files, runs commands, sees the errors, and tries again.

Examples are Claude Code, GitHub Copilot, and Cursor. Today we'll use Claude Code.

It can change a lot of code quickly, and you are responsible for all of it.

---

## Keep It Inside the Project

<style scoped>section { font-size: 24px; }</style>

Start Claude from your project folder, so its work is limited to that project:

```bash
cd gsk-intro-scientific-python-course
claude
```

By default it asks before it edits a file or runs a command. Read what it asks and approve each one.

Giving it full access to your computer is risky. It can do a lot of damage by accident, like deleting or overwriting files outside your project.

Don't turn off the permission prompts. Start small and open up access only as you build trust.

Keep your code separate from your data. If private data sits inside the project folder, Claude can read it. Store private data in a different folder, outside the project.

---

## Agents Build on What You Know

You now know the basis of most scientific libraries. These are all just collections of different data types with some helpful functions and properties. They all build on these core principles.

We can now import packages, load data, transform it, and analyze it. Agents just take it to the next level by writing and executing our ideas. You are the driver.

---

## Use It to Understand

<style scoped>section { font-size: 26px; }</style>

You can ask it to explain, not only to write:

```
Explain what this line does: X = df_2007[['log_gdp']]
```

```
Walk me through this script one step at a time.
```

```
I got this error. What does it mean, and what caused it?
```

If an explanation doesn't make sense, ask again. You'll recognize a good one now.

---

## Plan First

<style scoped>section { font-size: 24px; }</style>

Before any code is written, ask for a plan. Read it, correct it, and only then say go.

You can also limit which libraries it uses. Point it to your environment file:

```
Plan an analysis of life expectancy in gapminder.tsv. Use only the
packages in environment.yml. Don't write any code yet.
```

Or name them: `Use pandas and scikit-learn.`

If the plan wants a package that isn't in the file, stop and ask why. These are the libraries we have used and can look up the docs for.

---

## Review What It Wrote

<style scoped>section { font-size: 24px; }</style>

Code that runs is not code that is right. Check it against what we did today:

- Is the data split into train and test?
- Is the score computed on the **test** set?
- Is anything fit on the test data?
- Is `X` a DataFrame and `y` a Series?
- Is there one intercept, not two?
- Do the numbers make sense? Run `r2_score` yourself.

---

## Iterate in Small Steps

<style scoped>section { font-size: 26px; }</style>

Ask for one thing at a time, run it, and read the result before the next request.

Give it context so you don't repeat yourself. A `CLAUDE.md` file in your project is read at the start of each session:

```markdown
# Project notes
- Use only the packages in environment.yml
- Data is in data/gapminder.tsv
- Explain what each step does
```

You can also tell Claude to remember something: `Remember to always explain each step.` A `CLAUDE.md` in your home folder, `~/.claude/CLAUDE.md`, applies to every project.

---

## When Not to Lean On It

- When you are still learning the concept. You have to struggle with it first
- When you can't explain the code to someone else
- When the data is private or shouldn't leave your computer

---

## Demo

Let's ask Claude Code to fit a model on the Gapminder data.

1. Ask for a plan, using only the packages in `environment.yml`
2. Read the plan and correct it
3. Let it write the code, and run it
4. Review it with our checklist. What would you question?

---

## Save Your Work

Commit and push your notes from today on your `personal` branch:

```bash
git add notebooks/module_09.ipynb
git commit -m "Module 9 notes"
git push --force-with-lease origin personal
```

---

## <!-- fit --> That's it for today!
