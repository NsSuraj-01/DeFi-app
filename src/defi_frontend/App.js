
import {defi_backend} from "../declarations/defi_backend"; 

async function getBalance() {
  var balance = await defi_backend.checkBalance();
  balance = Math.round(balance*100)/100;
  document.getElementById("value").innerHTML = balance;
}

window.addEventListener("load", async () => {
  await getBalance();
});

document.querySelector("form").addEventListener("submit", async (event) => {
  event.preventDefault();

  const button = event.target.querySelector("#submit-btn");
  
  const inputAmt = parseFloat(document.getElementById("input-amount").value);
  const withdrawAmt = parseFloat(document.getElementById("withdrawal-amount").value);  

  button.setAttribute("disabled", true);

  if(document.getElementById("input-amount").value.length != 0) {
    await defi_backend.topUp(inputAmt);
  }

  if(document.getElementById("withdrawal-amount").value.length != 0) {
    await defi_backend.withDraw(withdrawAmt);
  }

  await defi_backend.compound();

  await getBalance();

  document.getElementById("input-amount").value="";
  document.getElementById("withdrawal-amount").value="";

  button.removeAttribute("disabled");
});