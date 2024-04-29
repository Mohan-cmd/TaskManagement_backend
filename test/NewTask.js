const {ethers} = require("hardhat");
const {expect}= require("chai");
// import {NewTask} from '..artifacts/contracts/NewTask.sol';
describe("NewTask", function(){

    beforeEach(async function(){
        [owner,employee1,employee2,employee3,manager1] = await ethers.getSigners();

        const TokenContract = await ethers.getContractFactory("Token");
        taskToken =  await TokenContract.deploy();
        console.log('Task Token address is : '+taskToken.target);

        const NewTaskContract = await ethers.getContractFactory("NewTask");
        newTask = await NewTaskContract.deploy(taskToken.target);
        console.log('New Task Contract address : '+newTask.target);

        
    })

    it("Should create a Employee ",async function(){
        const employee={
             name: "Rohan",
             empWallet: employee1,
             empID:1
        }
        
        await newTask.registerEmployee(employee);

        const registeredEmployee =  await newTask.employees(0);
        console.log('registered Employee: '+registeredEmployee);
        expect(registeredEmployee.name).to.equal("Rohan");

        const managerR={
            name: "Manager1",
            empWallet: manager1,
            empID:2
        }
        const Emp={
            name: "Ram",
            empWallet: employee2,
            empID:3
        }

        await newTask.registerEmployee(managerR);       
        const registeredManager = await newTask.employees(1);
        console.log('registered Manager: '+registeredManager);
        expect(registeredManager.name).to.equal("Manager1");
        
        await newTask.registerEmployee(Emp);
        const registerEmployee = await newTask.employees(2);
        console.log('Registered Employee: '+registerEmployee);
        expect(registerEmployee.name).to.equal("Ram");

    })
    it("Should create a manager", async function(){
        await newTask.CreateManager(manager1);
        const mgrRegistered= await newTask.isManager(manager1);
        console.log('Registered Manager: '+mgrRegistered);
    })
    it("Should create a Team ",async function(){
       
        await newTask.CreateTeam(employee2,manager1);

        const EmpManager = await newTask.teamsMappings(employee2);
        expect(EmpManager).to.equal(manager1);
    })
   
    // it("should transfer tokens", async function () {
    //     const initialBalance = await taskToken.balanceOf(owner.address);
    //     const amountToTransfer = ethers.parseEther("10");
    //     console.log('AMount to transfer is : '+amountToTransfer)
    //     // Mint tokens for owner
    //     await taskToken.connect(owner).mint(owner, amountToTransfer);

    //     // Approve the NewTask contract to spend tokens on behalf of the owner
    //     await taskToken.connect(owner).approve(newTask.target, amountToTransfer);

    //     // Transfer tokens from owner to employee1 using NewTask contract
    //     await newTask.connect(owner).transferTokens(owner, manager1, amountToTransfer);

    //     const finalBalance = await taskToken.balanceOf(manager1);
    //     console.log('finalBalance is: '+finalBalance);
    //     expect(finalBalance.sub(initialBalance)).to.equal(amountToTransfer);
    // });


    it("Should transfer tokens between accounts after minting", async function () {
        const transferAmount = 1000;
      
        // Mint tokens to owner (if applicable)
        // const mintTx = await taskToken.connect(owner).mint(owner.address, transferAmount); // Assuming your Token contract has a "mint" function
        // await mintTx.wait();
      
        // Ensure correct target address
        const targetAddress = newTask.target; // Replace with actual deployed address if needed
      
        // 1. Approve the transfer:
        const tx1 = await taskToken.connect(owner).approve(targetAddress, transferAmount);
        await tx1.wait();
      
        const ownerBalanceBefore = await taskToken.balanceOf(owner);
        console.log('OwnerBalanceBefore is :', ownerBalanceBefore);
      
        // 2. Execute the transfer using NewTask contract:
        const tx = await newTask.connect(owner).transferTokens(owner, manager1, transferAmount);
        await tx.wait();
      
        const ownerBalanceAfter = await taskToken.balanceOf(owner);
        console.log('OwnerBalanceAfter is :', ownerBalanceAfter);
        const manager1Balance = await taskToken.balanceOf(manager1);
        console.log('ManagerBalance is :', manager1Balance);
      
        expect(ownerBalanceAfter).to.equal(ownerBalanceBefore - BigInt(transferAmount));
        expect(manager1Balance).to.equal(transferAmount);
      });
      
    it("Creating Task", async function(){
        
        // Task(TotalTasks,_title,_description,_assignedEmployee,_complexity,_deadline,_tokens,false,false,false);
        const taskAssindEmployee= employee2;
       let taskId=await newTask.createTask("Create contract token","Creating the token tak with the name and amount",taskAssindEmployee,1,10052024,1200);
       //const taskId= newTask.TotalTasks;
       taskId = taskId.value;
       console.log("Task id created is : "+taskId);
       const stroredtaskData=await newTask.getTaskDetails(taskId);
       console.log("task is :"+stroredtaskData);
       //const storedEmpIdis = stor
       //console.log('task EMployee si :'+)
       expect(await stroredtaskData.assignedEmployee).to.equal(taskAssindEmployee)
    })

    it("Assign, Complete and Approve Task", async function(){
        transferAmount = 20000
        taskTokens =1200;
        // 1. Approve the transfer:
        const targetAddress = newTask.target;
        const tx1 = await taskToken.connect(owner).approve(targetAddress, transferAmount);
        await tx1.wait();
      
        const ownerBalanceBefore = await taskToken.balanceOf(owner);
        console.log('OwnerBalanceBefore is :', ownerBalanceBefore);
        
        // Create Manager;
        await newTask.CreateManager(manager1);
        const verifyMgr = await newTask.isManager(manager1);
           console.log('Verification of manager: '+verifyMgr);
        expect(verifyMgr).to.equal(true);
        // 2. Execute the transfer using NewTask contract:
        const tx = await newTask.connect(owner).transferTokens(owner, manager1, transferAmount);
        await tx.wait();
      
        const ownerBalanceAfter = await taskToken.balanceOf(owner);
        console.log('OwnerBalanceAfter is :', ownerBalanceAfter);
        const manager1Balance = await taskToken.balanceOf(manager1);
        console.log('ManagerBalance is :', manager1Balance);
      
        expect(ownerBalanceAfter).to.equal(ownerBalanceBefore - BigInt(transferAmount));
        expect(manager1Balance).to.equal(transferAmount);
        
        // Creat a team
        await newTask.CreateTeam(employee2,manager1);

        const EmpManager = await newTask.teamsMappings(employee2);
        expect(EmpManager).to.equal(manager1);

      // assign task

        const taskAssindEmployee= employee2;
       let taskId=await newTask.createTask("Create contract token","Creating the token tak with the name and amount",taskAssindEmployee,1,10052024,taskTokens);
       //const taskId= newTask.TotalTasks;
       taskId = taskId.value;
       console.log("Task id created is : "+taskId);
       const stroredtaskData=await newTask.getTaskDetails(taskId);
       console.log("task is :"+stroredtaskData);
       //const storedEmpIdis = stor
       //console.log('task EMployee si :'+)
       expect(await stroredtaskData.assignedEmployee).to.equal(taskAssindEmployee)
        
       // complete task
       await newTask.connect(employee2).completeTask(taskId)
        
       // verify task
       await newTask.verifyTask(taskId)

       // approve task
       await newTask.connect(manager1).approveTask(taskId)
       await taskToken.connect(manager1).approve(newTask.target,taskTokens);
       await newTask.connect(manager1).transferTokens(manager1,employee2,taskTokens)
       const taskdetails = await newTask.getTaskDetails(taskId);

       console.log('task data is :'+ taskdetails);
        
       const employeeBalance = await taskToken.balanceOf(employee2);
       expect(employeeBalance).to.equal(taskTokens);

    })

})
