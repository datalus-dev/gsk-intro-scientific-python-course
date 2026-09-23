---
# title: Module 05: Intro to Pandas
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

# Module 05: Intro to Pandas

September 28, 2026

---

Content covered:

1. Objects and Classes
2. Intro to Pandas
   1. DataFrames
   2. Loading Data
   3. Summary Statistics
   4. Group-apply-combine

---

By the end of this class, you will be able to:

- Describe what an object/class is
- Create and inspect a pandas DataFrame
- Load external data into a DataFrame
- Compute summary statistics on a DataFrame
- Use group-apply-combine to summarize data by category

---

## <!-- fit -->1. Objects and Classes

---

## Classes

Classes, also called Objects, are containers in Python that can store values, known as `attributes`; and functions, known as `methods`

---

## We've Already Been Using Objects

```python
arr = np.arange(24)
arr.shape          # an attribute
arr.reshape(4, 6)  # a method

fig, ax = plt.subplots()
ax.set_title("A title")  # a method on an Axes object
```

Attributes are accessed with a `.` and no parentheses. Methods are called with `()`, just like functions.

---

## Anatomy of a Class

Classes are defined using `class` keyword:

```python
class MyClass:
    def __init__(self, attribute1):
        self.attribute1 = attribute1
```

`__init__` runs when you create a new object, and `self` refers to that object.

```python
obj = MyClass(5)
obj.attribute1
```

---

## Classes cont.

You can also include functions that will be stored in the object by default too:

```python
class MyClass:
    def __init__(self, attribute1):
        self.attribute1 = attribute1

    def stringify(self, value):
        return str(value)
```

---

## Exercise

1. Define a class `Sample` that stores a `name` and a NumPy array of `values`.
2. Add a method `summary()` that returns the mean and standard deviation of `values`.
3. Create two `Sample` objects with simulated data from `rng.normal()` and call `summary()` on each.

---

## <!-- fit -->2. Intro to Pandas
