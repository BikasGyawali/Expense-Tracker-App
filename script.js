var state={
    balance: 0,
    income: 0,
    expense: 0,
    transactions: [
       
     ]
}

var balanceEl=document.querySelector(".balancecontainer .amount");
var incomeEl=document.querySelector(".incomecontainer #income");
var expenseEl=document.querySelector(".expensecontainer #expense");
var transactionsEl=document.querySelector(".transaction");
var addincomeEl=document.querySelector(".addincome");
var addexpenseEl=document.querySelector(".addexpense");
var nameEl=document.querySelector("#name");
var amountEl=document.querySelector("#amount");


function uniqueId(){
	return Math.round(Math.random()*1000000);
}

function init(){
	var localState= JSON.parse(localStorage.getItem("expensetrackerstate"));

	if (localState!=null){
		state= localState;
	}
    updateState();
    initListeners();
    
}    



function initListeners(){
    addincomeEl.addEventListener('click', onaddincomeclick);
    addexpenseEl.addEventListener('click', onaddexpenseclick);
}

function onaddincomeclick(){
    addTransaction(nameEl.value, amountEl.value, 'income');  
    
}
function onaddexpenseclick(){
    addTransaction(nameEl.value, amountEl.value, 'expense');
}
function addTransaction(name, amount, type){
    var name= nameEl.value;
    var amount=amountEl.value;

    if (name!=='' && amount!==''){
        var transaction={
        id: uniqueId(),	
        name: name,
        amount: parseInt(amount),
        type: type
        };
        state.transactions.push(transaction);
        updateState();
    }   else{
        alert('Please enter valid data');
    }
    nameEl.value= '';
    amountEl.value= '';
}


function deletebtn(event){
      var id = parseInt(event.target.getAttribute("data-id"));
      var deleteIndex;
     for (var i=0;i<state.transactions.length;i++){
     	if (state.transactions[i].id === id){
     		deleteIndex= i;
     		break;
     	}
     }
     	state.transactions.splice(deleteIndex,1);
        updateState(); 
    
}


function updateState(){
    var balance=0,
        income= 0,
        expense= 0,
        item ;   
    for (var i=0; i<state.transactions.length; i++){
        item=state.transactions[i];
        if (item.type==='income'){
          income+= item.amount;
        }
        else{
            expense+=item.amount;
        }
    }
    balance=income-expense;
    
    state.balance=balance;
    state.income=income;
    state.expense= expense;

    localStorage.setItem('expensetrackerstate', JSON.stringify(state));

    render();
}

function render(){
    balanceEl.innerHTML= `$${state.balance}`;
    incomeEl.innerHTML= `$${state.income}`;
    expenseEl.innerHTML= `$${state.expense}`;
    
   var transactionEl, divEl, amountEl,item, buttonEl;
   
   transactionsEl.innerHTML='';

    for(var i=0; i<state.transactions.length; i++){
         item= state.transactions[i];
         transactionEl= document.createElement('li');
         transactionEl.append(item.name);
         transactionsEl.appendChild(transactionEl);

         divEl=document.createElement('div');
         amountEl=document.createElement('span');
         if (item.type === 'income'){
            amountEl.classList.add("incomee");
         }
         else if (item.type === 'expense'){
            amountEl.classList.add("expensee");
         }
         amountEl.innerHTML=`$${item.amount}`;
         divEl.appendChild(amountEl);

         buttonEl=document.createElement('button');
         buttonEl.setAttribute("data-id", item.id);
         buttonEl.innerHTML="X";

         buttonEl.addEventListener('click', deletebtn)

         divEl.appendChild(buttonEl);
         transactionEl.appendChild(divEl);
    }
}

init();