
let gamemode=document.querySelector('.gametype')
let playmode=document.querySelector('.gameplay')
gamemode.style.display='block'
playmode.style.display='none'

let resetbtn=document.getElementById('reset');
let home=document.getElementById('back')
let btn=document.querySelector('.container');
let grids=document.querySelectorAll('.grid');
let chance=document.getElementById('turn');
let win=document.getElementById('winner');

let gameover=false;
let moves=0;
let x=0;
let o=0;
let board=['', '', '', '', '', '', '', '', ''];
home.onclick=()=>{
    if(gamemode.style.display==='none'){
        resetgame(); 
        window.location.reload();
        playmode.style.display='none'
        gamemode.style.display='block'
        
    }
    
}
resetbtn.onclick=()=>{   
    resetgame();  
}


function playwithplayer(){
    gamemode.style.display='none'
    playmode.style.display='block'

chance.innerHTML=`Player 1's turn`
let cur='X';
let pr1=document.getElementById('p1');
let pr2=document.getElementById('p2');
pr1.style.borderColor='yellow'
pr2.style.borderColor='white'
    
btn.onclick=(e)=>{
    

    let box=e.target;
    
   if(!box.innerHTML&&!gameover){
    moves++;
    box.innerHTML=cur
    if(cur==='X'){
        box.style.color="blue";
        pr2.style.borderColor='yellow'
        pr1.style.borderColor='white'
    }
    else{
        box.style.color="#FF007F";
        pr1.style.borderColor='yellow'
        pr2.style.borderColor='white'
    }
    
    checkresult(cur);
    
    if(!gameover){
        
        chance.innerHTML=(chance.innerHTML===`Player 1's turn`)?`Player 2's turn`:`Player 1's turn`;
        cur=cur==='X'?'O':'X';
    }
  
   }
}
}


function playwithComputer(){
    
    gamemode.style.display='none'
    playmode.style.display='block'

    let player1='X';
    let player2='O';
    let pid=0;
    let pr1=document.getElementById('p1');
    let pr2=document.getElementById('p2');

    pr1.style.borderColor='yellow'
    pr2.style.borderColor='white'
    
        
     
    btn.onclick=(e)=>{
        let box=e.target;   
       if(!box.innerHTML&&!gameover){
        moves++;
        box.innerHTML=player1;
        pid=box.id;
        board[box.id]=player1;

       
            box.style.color="blue";
          
            chance.innerHTML=chance.innerHTML===`Player 1's turn`?`Player 2's turn`:`Player 1's turn`;
        
            checkresult(player1);
            if(!gameover){
                computerturn();
            }
           
       }
    }

    function computerturn(){
        let wpattern=[
            [0,1,2],[3,4,5],[6,7,8],[0,3,6],
            [1,4,7],[2,5,8],[0,4,8],[2,4,6]
            ]
        let step=0;
        let findplace=false;
        for(let pattern of wpattern){
            const [a,b,c]=pattern;
    
            if(board[a]===player2 &&
            board[b] === player2&& board[c]===''||board[a]=== player2 &&
            board[c] === player2&&board[b]===''||board[b]=== player2 &&
            board[c] === player2&&board[a] ===''){
                if(!board[a]){
                    step=a;
                }
                else if(!board[b]){
                    step=b;
                }
                else {
                    step=c;
                }
                findplace=true;
                break;
            }
            else if(board[a]===player1 &&
                board[b] === player1&& board[c]===''||board[a]=== player1 &&
                board[c] === player1&&board[b]===''||board[b]=== player1 &&
                board[c] === player1&&board[a] ===''){
                if(!board[a]){
                   step=a;
                }
                else if(!board[b]){
                    step=b;
                }
                else {
                    step=c;
                }
                findplace=true;
                  break; 
            }
           
        }
        if(!findplace){
            if(!board[4]){
                step=4;
            }
            else{
            let randam=Math.floor(Math.random()*9)+1;
            while(board[randam]!==''){
                randam=Math.floor(Math.random()*9)+1;
            }
            step=randam;
            }
            
        }
        moves++;
        document.getElementById(step).innerHTML=player2;
        board[step]=player2;
       
        document.getElementById(step).style.color="#FF007F";
            
            chance.innerHTML=chance.innerHTML===`Player 1's turn`?`Player 2's turn`:`Player 1's turn`;
            checkresult(player2);
            
    }  
}

function checkresult(player){
    let winningpattern=[
        [0,1,2],[3,4,5],[6,7,8],[0,3,6],
        [1,4,7],[2,5,8],[0,4,8],[2,4,6]
    ]

    for(let pattern of winningpattern){
        const [a,b,c]=pattern;
        if(board[a] === player&& board[b]===player&& board[c] === player){
            gameover=true;
                win.style.display='block'
               if(player==='X'){
                x++;
                win.innerHTML=`Player 1 Winner`
                
               }
               else{
                o++;
                win.innerHTML=`Player 2 Winner`
               }    
           break;
        }
        else if(moves===9&&!gameover){
            gameover=true;
            win.style.display='block'
            win.innerHTML=`Draw! The match is drawn`;
            break;
        }    
    }  
}
  
function resetgame(){
    grids.forEach((grid)=>{
        grid.innerHTML='';
        board[grid.id]='';
    })  
  
    moves=0;
    gameover=false;
    cur='X'; 
    chance.innerHTML=`Player 1's turn`
    document.getElementById('p1').style.borderColor='yellow';
    document.getElementById('p2').style.borderColor='white';
    win.innerHTML='';
    win.style.display='none'
    
    document.getElementById('px').innerHTML=`${x}`;
    document.getElementById('po').innerHTML=`${o}`;

}