## Statsmodels

Statsmodels is a Python package for statistical analysis. It has many features that have been modeled from R.

```python
import statsmodels.api as sm
```

With statsmodels, the convention is to import the API submodule as `sm`.

If you use `dir(sm)`, it will print all the available models.

---

We're going to look at ordinary least squares (OLS), which is your standard linear regression model.

First, let's import our data.

```python
df = sm.datasets.get_rdataset("Guerry", "HistData").data
```

Statsmodels has some built-in datasets we can pull from. We will be looking at the `Guerry` dataset.

---

This creates a Pandas dataframe, which allows us to do some exploratory analyses:

```python
vars = ['Department', 'Lottery', 'Literacy', 'Wealth', 'Region']

df_simplified = df[vars]
```
