## Assignment 06 Q&A

## 1. What is the difference between var, let, and const?

There are some difference between the var, let and const .

- var : var is a function scope , it will accessible any where in function where
  its declared ,and if declared outside a funtion can be accessible globally.var
  can be used before declaretion without error , give undifined also ignore if
  statement,for loop etc. var can be reassigned and redeclareble.

- let : let is a block scope {}, only accessible within the block in which it
  was declared.it's give refference error when call it before declaretion .it's
  can't be redeclare in same scope but can be reassigned .

- const : const is a also block scope but can't reassigne or redeclareble within
  the same scope . can't change value directly but can change in object
  properties or an array element.

  ## 2. What is the difference between map(), forEach(), and filter()?

  This all are used in array for different purpose and give different output
  value

- map(): map check all elements of an array using callback function but its
  give/return a new array satisfied the funtion without changed the orginal
  array .

- forEach(): forEach used to check all elements of an array but its return
  undefined and does not create a new array .

- filter(): filter used to check all an array elements using callback function
  and return a new array where included the all truthy value of elements . if
  the function give falsy value then its remove the elements.

## 3. What are arrow functions in ES6?

- Arrow function is introduced in ES6 , it's much cleaner , shorter compare to
  the traditional function . in there 'this' is the differnce between arrow and
  traditional function . arrow function use => this and if there are single
  parameter then the () is optional but in no parameter () is required .and its
  not have the arguments object also cannot be used as constructors .

## 4. How does destructuring assignment work in ES6?

- Destructuring assignment in ES6 is a powerful syntax, we can extract the array
  value or object property into distinct variables.its create new variable from
  their content.

- Array Destructuring : Extract array values by variable names within []. we can
  use defualt values if by chance element is undefined .also skip element by
  ,space, and also use rest of element by spread ... , it will save the others
  value into rest variable by an array .

```javascript
const fruits = ['apple', 'banana', 'cherry'];
const [first, second] = fruits;
```

in there the output is apple for fisrt variable and banana is for secound
variable.

- Object Destructuring : its also same like the array but in here we use the
  object property name to extract the property.can rename the variable name
  using colon : also can be set the default value.

## 5. Explain template literals in ES6. How are they different from string concatenation?

- Template literals are a way to create strings that allow for embedded
  expressions and multi-line strings . its used by backtic `` ,not like regular
  "" qoutes. in string if we want to add variables to the string then we need +
  operator . and in multiple line its very hard to join into a single string or
  make a string to multiple line . but in Template literals its become very easy
  to maintain this multiple line or the variables . we can use this to add
  variable ${expression} .also can add variable names, arithmetic operations,
  function calls, or even conditional (ternary) operators normally .
