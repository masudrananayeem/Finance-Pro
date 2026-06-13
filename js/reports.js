const reportBody =
document.getElementById("reportBody");

if(reportBody){

const transactions =
JSON.parse(
localStorage.getItem("transactions")
) || [];

transactions.forEach(item=>{

reportBody.innerHTML += `

<tr>

<td>${item.date}</td>

<td>${item.type}</td>

<td>${item.amount}</td>

</tr>

`;

});

}