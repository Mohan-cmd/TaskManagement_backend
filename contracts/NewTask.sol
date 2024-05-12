pragma solidity >0.7.0 <=0.9.0;

import "./Token.sol"; 

contract NewTask {
    Token public taskToken;
    //TokenAddress public;
    constructor(address _taskTokenAddress) {
        taskToken = Token(_taskTokenAddress);
        //TokenAddress= _taskTokenAddress;
    }
   //address public manager;
    Employee[] public employees;
    mapping(address=>address) public teamsMappings;
    address [] public reportees;
    address [] public managers;
    mapping(address=>bool)public isEmployeeRegistered;
    //address contractAddress = 0x69c096baFeB31473d872af3ed853a116219acE87;
    struct Employee{
        string name;
        address empWallet;
        uint empID;
    }
    event Error(string message);
    event EmployeeRegistered(address empWallet,uint256 empID);
// Register Employee
    function registerEmployee(Employee memory emp) public{
        if(isEmployeeRegistered[emp.empWallet]){
            revert("Employee already registered");
        }
        require(!isEmployeeRegistered[emp.empWallet],"Employee already registered");
        emp.empID=(employees.length+1);
          employees.push(emp);
          isEmployeeRegistered[emp.empWallet]=true;
          emit EmployeeRegistered(emp.empWallet,emp.empID);
    }
// Create manager
    function CreateManager(address emp) public{
      // require(!managers.contains(emp), "Manager already registered");
      require(isEmployeeRegistered[emp],"Employee not registered");
       bool isManagerRegistered = false;
        if(isManager(emp)){
            isManagerRegistered =true;
        }
       require(!isManagerRegistered,"Manager already registered");
       managers.push(emp);
    }

     // Verify emp is manager
     function isManager(address mgr) public view returns(bool){
        bool isManager=false;
        for(uint i=0;i<managers.length;i++){
            if(managers[i]==mgr){
                isManager=true;
                break;
            }
        }
        return isManager;
     }
// Creating Team
    function CreateTeam(address emp,address Manager) public  {
        require(isEmployeeRegistered[emp],"Employee not registered");
        bool isManagerRegistered = false;
        if(isManager(Manager)){
            isManagerRegistered =true;
        }
        require(isManagerRegistered,"Manager not registered");
        teamsMappings[emp]=Manager;
            
    }
// Get Employees Data
   function getEmployees()public view returns(Employee[] memory){
    return employees;
   }    
// View Team
    function viewTeam(address manager) public returns (address[] memory){
        
          for(uint i=0;i<employees.length;i++){
            if(teamsMappings[employees[i].empWallet]== manager){
                reportees.push(employees[i].empWallet);
            }
          }
          return reportees;
    }
 // function approveTransfer
     function approveTransfer(uint256 _amount) public {
        taskToken.approve(address(this),_amount);
     }
     
// Transfer Tokens
   function transferTokens(address _from, address _to, uint256 _amount) public {
        
        //taskToken.approve(address(this), _amount);
        

       //taskToken.allowance(_from, _to);
        // Transfer tokens from _from to _to
        taskToken.transferFrom(_from, _to, _amount);
    }

    struct Task{
        uint taskId;
        string title;
        string description;
        address assignedByMgr;
        address assignedEmployee;
        uint complexity;
        uint deadline;
        uint tokens;
        bool inprogress;
        bool completed;
        bool verified;
        bool approved;

    }

    mapping (uint => Task) public Tasks;
    mapping (address => uint[]) public TasksBymanager;
    mapping (address => uint[]) public TasksOfEmployee;
   
    uint public TotalTasks;

    // Create Task
     function createTask(string memory _title,string memory _description,address _assignedByMgr, address _assignedEmployee,uint _complexity,uint _deadline,uint _tokens) public returns (uint ){
        Tasks[TotalTasks] = Task(TotalTasks,_title,_description,_assignedByMgr,_assignedEmployee,_complexity,_deadline,_tokens,false,false,false,false);
        TasksBymanager[_assignedByMgr].push(TotalTasks);
        TasksOfEmployee[_assignedEmployee].push(TotalTasks);
        TotalTasks++;
        return TotalTasks;
     }

     // Assign Task
     function assignTask(uint taskId,address _assignedEmployee) public {
        require(Tasks[taskId].assignedEmployee == address(0),"Task Already assigned");
        Tasks[taskId].assignedEmployee = _assignedEmployee;
     }

     // Change task to in progress
     function inProgressTask(uint taskId) public {
        Tasks[taskId].inprogress =true;
     }

     // Mark Task Completion
     function completeTask(uint taskId) public {
        require(Tasks[taskId].assignedEmployee == msg.sender,"Only Assigned EMployee can change status");
        Tasks[taskId].completed = true;
     }

     // Verify Task Completion
     function verifyTask(uint taskId) public {
        require(Tasks[taskId].inprogress,"Task is Not in-progress");
        require(Tasks[taskId].completed,"Task Not completed");
        Tasks[taskId].verified = true;
     }
     
     // Approve Task Completion
     function approveTask(uint _taskId) public {
        require(isManager(msg.sender),"Only Manager can approve");
        require(Tasks[_taskId].verified,"Task is Not verified");
        Tasks[_taskId].approved =true;

        // require(taskToken.allowance(address(this), address(taskToken)) >= Tasks[_taskId].tokens, "Insufficient allowance");
        // transferTokens(address(this),Tasks[_taskId].assignedEmployee,Tasks[_taskId].tokens);
     }

     // Get task Details
     function getTaskDetails(uint _taskId) public view returns(Task memory){
        return Tasks[_taskId];
     }

     // Get managers
     function getManagers() public view returns(address[] memory){
        return managers;
     }

     // Get manager tasks
       function getManagerTasks(address _mgrAddress) public view returns(Task[] memory){
        uint[] memory taskIds = TasksBymanager[_mgrAddress];
        Task[] memory tasks = new Task[](taskIds.length);

        for(uint i=0; i<taskIds.length;i++){
            tasks[i] = Tasks[taskIds[i]];
        }
        return tasks;
       }

     // Get Employee tasks
        function getEmployeesTasks(address _empladdress) public view returns(Task[] memory){
          uint[] memory taskIds = TasksOfEmployee[_empladdress];
          Task[] memory tasks = new Task[](taskIds.length);

          for(uint i=0; i<taskIds.length;i++){
            tasks[i] = Tasks[taskIds[i]];
          }
          return tasks;

        }  


      function getAllTaskDetails() public view returns (uint[] memory, string[] memory){
         uint[] memory taskIDs= new uint[](TotalTasks);
         string[] memory descriptions = new string[](TotalTasks);
         // bool[] memory completions = new bool[](TotalTasks);

         for(uint i=0; i<TotalTasks; i++ ){
            taskIDs[i] = Tasks[i].taskId;
            descriptions[i] = Tasks[i].description;
            // completions[i] = Tasks[i].
         }

         return(taskIDs,descriptions);
      }

}
