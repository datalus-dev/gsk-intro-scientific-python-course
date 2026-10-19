# Final Assignment

Due Monday, October 26, 2026

This assignment brings together everything from Modules 1 to 8: NumPy simulations, Pandas, Seaborn, SciPy, statsmodels, and scikit-learn. We'll use a Jupyter Notebook with Markdown cells describing what you're doing and why, and code cells showing your work. On October 26th, you will each present your notebook to the class.

Let's work on our `personal` branch. First, bring it up to date with the course repo:

```bash
git switch main
git pull upstream main
git switch personal
git rebase main
```

Save your work on `personal` as you go with `git add` and `git commit`.

Throughout this assignment, we'll look at the physical and chemical properties of wine. The file, `notebooks/data/wine_quality.arff`, has 6,497 wines, each with 11 measurements, such as `alcohol`, `pH`, and `residual.sugar`, and a `quality` score. The score is the median rating, from 0 (very bad) to 10 (very excellent), of at least three wine experts. Our goal is to form a hypothesis about the data, check it, and then model what makes a wine good.

The data comes from Cortez et al. (2009), "Modeling wine preferences by data mining from physicochemical properties", *Decision Support Systems* 47(4):547-553. It is also available on OpenML: https://www.openml.org/search?type=data&id=287

## 1. Hypothesis and Simulation

Before we look at any values, let's say what we expect to see.

- Choose one measurement to focus on, other than `quality`, e.g. `alcohol`, `pH`, `residual.sugar`, or `chlorides`
- In a Markdown cell, write your hypothesis: what shape do you expect the distribution to have, and roughly what mean and standard deviation? Explain your reasoning. Do not look at the data to answer this.
- Create a seeded random number generator with `np.random.default_rng()`
- Write a function that takes the generator, a mean, a standard deviation, and a number of samples, and returns simulated values from `rng.normal()`. If you expect a skewed distribution, use `rng.lognormal()` instead.
- Use your function to simulate 6,497 wines, the same size as our dataset
- Use a `for` loop over sample sizes of 10, 100, 1,000, and 6,497. For each, print the simulated sample's mean, its standard deviation (`ddof=1`), and the standard error, `std / np.sqrt(n)`.
- Make a histogram of your 6,497 simulated values with a title and axis labels
- In a Markdown cell, answer: how close is the sample mean to the mean you chose, and how does that change with the sample size? What does the standard error tell you?

## 2. Loading Data

- Load the data with `scipy.io.arff`, which can read the `.arff` format that Pandas can't:

```python
from scipy.io import arff

data, meta = arff.loadarff('data/wine_quality.arff')
df = pd.DataFrame(data)
```

  Your path depends on where your notebook is saved relative to the `data` folder.
- Show the first 5 and the last 5 rows
- Print the `shape`, `columns`, and `dtypes` of `df`
- The column names contain dots, like `fixed.acidity`, which don't work inside formulas. Replace the dots with underscores, e.g. with `df.columns.str.replace('.', '_', regex=False)`.
- Check for missing values with `df.isna().sum()`
- In a Markdown cell, answer: how many wines and how many measurements are in the data? What does each row represent? Is anything missing?

## 3. Summarizing the Data

- Run `.describe()` on `df`
- Use the `mean()` method of a `Series` to compute the mean of your chosen measurement, and compute its standard deviation
- Use `.value_counts()` on `quality` and sort it by score
- Create a Boolean column called `good`, which is `True` for wines with a `quality` of 6 or higher. Convert it to `0` and `1` with `.astype(int)`.
- Use `.query()` to select the wines with `alcohol` above 12, and print how many there are
- Use `groupby` and `agg` to compute the mean and standard deviation of `alcohol` for each `quality` score. Hint: `.agg(['mean', 'std'])`
- Use `groupby` on `good` to compute the mean of `alcohol`, `volatile_acidity`, `sulphates`, and `density`
- In a Markdown cell, answer: what fraction of the wines are `good`? Which of these measurements look different between good and not-good wines?

## 4. Checking the Hypothesis

- Make a figure with two subplots side by side:
  - On the left, a `sns.histplot()` of your simulated values from Section 1
  - On the right, a `sns.histplot()` of your chosen measurement from the real data
- Use the same x-axis limits on both, so that they can be compared. Add a title and axis labels to every plot.
- Compute the real mean and standard deviation of your measurement, and compare them with your hypothesis
- In a Markdown cell, answer: was your hypothesis right about the shape, the mean, and the standard deviation? If not, what did you get wrong, and why do you think so?

## 5. Plotting with Seaborn

- Make a figure with two subplots using `fig, axes = plt.subplots()`:
  - On the left, a `sns.boxplot()` of `alcohol` by `quality`
  - On the right, a `sns.histplot()` of `alcohol` with `hue='good'`
- Make a second figure with `sns.regplot()` of `alcohol` against `density`
- Add a title and axis labels to every plot, and save your figures with `fig.savefig()`
- In a Markdown cell, answer: how does `alcohol` change as `quality` goes up? What do you notice about `density` and `alcohol`?

## 6. Correlation and t-tests with SciPy

- Use `stats.pearsonr()` to get the correlation between `alcohol` and `quality`. Then use `stats.spearmanr()`. Which one is more appropriate for a score that only takes whole-number values, and why?
- Use `stats.ttest_ind()` to compare the `alcohol` of good wines and not-good wines. Pull each group out with `.query()`.
- In a Markdown cell, report your results in a sentence for each, like we did in Module 7, with the effect and the test: for example, "Alcohol was higher in good wines (X) than in the rest (Y), t = Z, p < 0.001." Does a small p-value mean that alcohol *causes* a wine to be good?

## 7. Regression with statsmodels

- Use `model_matrix()` from `formulaic` to build `y` and `X` from the formula `'quality ~ alcohol + volatile_acidity + sulphates'`
- Fit it with `sm.OLS(y, X).fit()` and print the `summary()`
- Fit a second model that adds two more measurements of your choice
- In a Markdown cell, answer: what does the `alcohol` coefficient mean in plain English? Which predictors are significant? How much did the `R-squared` change when you added predictors, and is the extra complexity worth it?

## 8. Prediction with scikit-learn

- Use `train_test_split()` to hold out 20% of the wines, with `random_state=42`
- Train a `LinearRegression` to predict `quality` from `alcohol`, `volatile_acidity`, and `sulphates`. Report the test R² and the RMSE.
- Train a `LogisticRegression` to predict `good` from the same features. Use `stratify` in your split. Report the accuracy and the confusion matrix on the test set.
- Compute the accuracy you would get by always guessing the most common class
- In a Markdown cell, answer: how does the test R² compare with the `R-squared` from statsmodels? Does your classifier beat always guessing the most common class, and by how much? Which kind of mistake does it make more often?

## 9. Present Your Notebook

On October 26th, you will each get about five minutes to walk us through your notebook. Be ready to cover:

- Your hypothesis from Section 1, and whether the data agreed with it
- One figure that you find most informative
- Your best model, how well it predicts, and one thing you would try next to improve it

## 10. Submit Your Work

Download your notebook from Jupyter Lab and upload it to [https://mskeducation.mskcc.org/](https://mskeducation.mskcc.org/) by Monday, October 26th, 1:30PM.
