/*
This is a different way to create the calculator, there are a lot of ways to do it.
We will choose this one to explain more useful things about javascript
We begin displaying the values of our operands when we click on the buttons. 
*/
const output = document.getElementById("output");
const form = document.getElementById("calc_form");
const operand_btns = document.querySelectorAll("button[data-type=operand]");
const operator_btns = document.querySelectorAll("button[data-type=operator]");

form.addEventListener("submit", (e) => {
  e.preventDefault();
});

let is_operator = false;
let equation = [];

const remove_active = () => {
  operator_btns.forEach((btn) => {
  });
};
/*
Instead of selecting all the buttons one after the other (which is tedious by the way) we used the querySelectorAll().
This will select all the buttons we specified and put them in a NodeList (an array with node items).
you cannot access any of those selected buttons unless you iterate over the array using one of the loop methods we discussed in that section.
We also added a click event listener to each button like this:
*/
operand_btns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    if (output.value == "0") {
      output.value = e.target.value;
      /*In the else..if statement, we check if there is a decimal in our output value.
       If there is, we simply stop adding any further decimal point by replacing it with an empty string. */
    } else if (output.value.includes(".")) {
      output.value = output.value + "" + e.target.value.replace(".", "");
    } 
    /* below your will find Another else..if statement checks to see whether we've previously clicked on an operator button. 
    If we have and then click on an operand button, we want to set the is_operator value to false and restart the value in the output from the new value.*/
    else if (is_operator) {
      is_operator = false;
      output.value = e.target.value;
    } else {
      output.value = output.value + "" + e.target.value;
    }  });
});
/*
Now let's also select the buttons with data-type operator and specify what will happen whenever we click on any of the buttons.


*/
operator_btns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
/*The switch statement that follows is a conditional statement in JavaScript,

The switch statement accepts a value (the condition), in this example the value of the button that was clicked. 
For each case, the value is checked. In the first case a % simply converts the number in the output to a percentage.

 */
    switch (e.target.value) {
      case "%":
        output.value = parseFloat(output.value) / 100;
        break;
        /*If it were the invert button, we would simply "invert" the output result by multiplying it by "-1." */
      case "invert":
        output.value = parseFloat(output.value) * -1;
        break;
        /*If the = button was clicked, we add the last value from the output value to our equation array, 
        use eval() to quickly evaluate every equation there, and then clear the equation array. */
      case "=":
        equation.push(output.value);
        output.value = eval(equation.join(""));
        equation = [];
        /*NOTE: eval() is a dangerous function. It can execute code when passed as input, 
        and users can use it to write malicious code that can be dangerous.
         Only use ever when you trust the source of input that will be provided.*/
        break;
        /*The code in the default runs when any other operator button that is not one of those we listed before is clicked. 
        In the default first, we obtain the last item in the array by using this code:*/
      default:
        let last_item = equation[equation.length - 1];
        /*
        Then, if the previous button we clicked was an operator—that is, 
        if it was one of the following: /, *, +, or - —we simply delete it from the equation using equation.pop() and add the new one we clicked with equation.push().
        */ 
        if (["/", "*", "+", "-"].includes(last_item) && is_operator) {
          equation.pop();
          equation.push(e.target.value);
        } else { //If our last array item was not an operator, we add the output value and the value of the button we clicked to the equation array.
          equation.push(output.value);
          equation.push(e.target.value);
        }
        is_operator = true;
        break;
    }
  });
});
/*You'll notice that for each case we pass in the break statement. 
The break statement here will stop the execution of the switch anytime a case is true and the code finishes executing. */