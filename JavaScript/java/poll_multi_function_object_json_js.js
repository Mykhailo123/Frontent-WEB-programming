/* Тут позадавали все переменные - варианты ответов и вопросов, счётчик... */
/* И сделалаи из них характеристики ОБЪЕКТА query */
/* ! Remember to add commas in an object you make и также не через =, а через : присвоенение сво-в объекту !*/


fetch('http://localhost/json/poll_server.php') .   /* В папке xampp -> htdocs -> json имя файла указываем (это и будет нашим localhost) */
    then(response => response.json()) 
    .then(function(query){
        console.log(query);

        console.log(query);
        answers(n_question.value, query);
        
        /* Actions when pressing the buttons - перенесли сюда */

btn.addEventListener("click", f_out);    /* "answer" */
btn1.addEventListener("click", f_out1);  /* "Behold the truth! */
btn2.addEventListener("click", () => f_out2(query) );  /* "let's go further" */
btn3.addEventListener("click", () => f_out2(query) );  /* Даже если мы выполняем 1 и то же действие, для этого нужно делать несколько кнопок (2 раза в HTML 1 кнопку вставлять нельзя, ни одна из них работаь не будет) */

     
     /* let el1 = document.createElement("p");
      el1.innerHTML = "<b>"+commits+"</b>";   // можно выводить лишь определённую информацию из этого объекта query. Например, commits.question_arr[0] - вывод самого первого [0] вопроса из списка вопросов question_arr
      right_div.appendChild(el1); */
    }
);

/* !! Теперь эта штука уже не нужна, она есть насервере ( в файл еpoll_server.php) */

/*query = {

  title_arr : [ "Know the Queen! 😀👑 Q 1/7","Know the Queen! 😀👑 Q 2/7","Know the Queen! 😀👑 Q 3/7","Know the Queen! 😀👑 Q 4/7","Know the Queen! 😀👑 Q 5/7", "Know the Queen! 😀👑 Q 6/7", "Know the Queen! 😀👑 Q 7/7" ],
  question_arr : ["When Beyoncé Giselle Knowles-Carter was born?","Who run the world? 🌍", "How many Grammys does the Queen B have?", "Who said these famous words: 'We shine the light on whatever's worst, perfection is a disease of a nation.'", "What is Beyonce's last song?", "What is the name of her last feat?", "How many children does Beyoncé have?" ],

  a1_arr : ["September 14, 1975", "Boys (No)", "28", "William Shakespeare", "BLACK PARADE", "Beyoncé - Flawless (Remix) ft. Nicki Minaj", "1" ],
  a2_arr : ["October 10, 1985", "Toys (No)", "79", "Bey", "APESHIT", "Beyoncé - Drunk in Love (Explicit) ft. JAY Z", "2" ],
  a3_arr : ["September 4, 1981", "Girls! (Yes)", "31", "Alla Pugachova", "BROWN SKIN GIRL", "Megan Thee Stallion - Savage Remix (feat. Beyoncé)", "3"  ],
  a4_arr : ["May 9, 1945", "Masons (Maybe)", "A lot!", "Some wise person", "***Flawless", "Beautiful Liar - Beyonce & Shakira", "4"  ],

  answer_arr : ["September 4, 1981", "Girls!", "sqrt(256) + 12", "Like, three guesses 'WHO?'", "BLACK PARADE", "'Savage' with Megan Thee Stallion 🐴", "Blue Ivy Carter, Rumi, and Sir"  ],  /* правильный ответ при нажатии на кнопку "показать ответ"
  n_right_answer_arr : [3, 3, 1, 2, 1, 3, 3]  /* № правильного ответа 

}
*/

/* счётчики */

let n_answer = 6;
let right_answers = 0;

console.log(query)
answers(n_question.value); /* Теперь функция answers с аргументом n_question.value просто вызывается, а не прописываются все строки кода */

/* Functions */

function f_out ()
{
    console.log(y1.checked);  /* console.log - Выводит сообщение в веб-консоль */
    console.log(y2.checked);
    console.log(y3.checked);
    console.log(y4.checked);

    if (y1.checked){ n_a = 1;}
    if (y2.checked){ n_a = 2;}
    if (y3.checked){ n_a = 3;}
    if (y4.checked){ n_a = 4;}
    
    console.log(n_a);

    if (n_a == n_right_answer){
      right_answers += 1;
      right_div.classList.remove("hidden");  /* В чём разница добавления hidden к "id..(" и к "class" ? Отв.: мы тут только по id добвляем, class hidden мы указывали в самом HTML */
      wrong_div.classList.add("hidden");  /* А вообще можно было не добавлять кнопку "далее" после неправильного ответа и тогда было бы меньше мороки */
    }
    else{
      right_answers-=1;
      right_div.classList.add("hidden");
      wrong_div.classList.remove("hidden");
      wrong.classList.remove("hidden");
    }
    console.log("n_question.value = "+n_question.value);
    console.log("n_answer = "+n_answer);
    
    if (n_question.value >= n_answer)  /* условие окончания теста */
    {
     
      btn2.classList.add("hidden");
      btn3.classList.add("hidden");  /* прячу кнопки (при нажатии на кнопку btn, которая выполняет на f_out, в которой мы находимся */
      let el1 = document.createElement("p");
      el1.innerHTML = "<b>"+right_answers+"</b>";
      right_div.appendChild(el1);
    } 
}



function f_out1 ()
{
      answer.classList.toggle("hidden"); /* toggle - это сменить с скрытого на открытый (opened) и наоборот*/
      btn1.classList.toggle("opend");
}
  
function f_out2 (query)
{
        right_div.classList.add("hidden");
        wrong.classList.add("hidden");
        wrong_div.classList.add("hidden");  /* Добавил ещё это и оно заработало (скрывает кнопки до нажатия на "ответ") - логично, так как при нажатии "let's go further" оно будет скрывать всё что навыводило до (то, чему присвоено) id wrong_div */
        answer.classList.add("hidden");
        k = Number(n_question.value);
        k+=1;
        
        answers(k, query)
        
        n_right_answer = n_right_answer_arr[n_question.value];

        if (n_question.value >= n_answer)  /* условие окончания теста - тут (f_out2) также нужно скрыть, так как f_out2 - это кнопка btn2, и при её нажатии тоже должны выводиться баллы, а не идти следующий ответ */
        {
          
          btn2.classList.add("hidden");
          btn3.classList.add("hidden");

        }
}

/* Поместим повторяющиеся строки кода в функцию */

function answers(k, query){
  
  n_question.value = k;
  console.log(query.n_question)

  title.innerHTML= query.title_arr[n_question.value];
  question.innerHTML= query.question_arr[n_question.value];  /* n_question.value - достаём варианты ответов из списка question_arr  */
  

  a1.innerHTML = query.a1_arr[n_question.value];            /* innerHTML Это свойство предоставляет простой способ полностью заменить содержимое элемента */
  a2.innerHTML = query.a2_arr[n_question.value];
  a3.innerHTML = query.a3_arr[n_question.value];
  a4.innerHTML = query.a4_arr[n_question.value];
  answer.innerHTML = query.answer_arr[n_question.value]; /* Теперь же к хар-кам ОБЪЕКТА (query) через точку обращаемся, для получения из него данных */
  
  n_right_answer = query.n_right_answer_arr[n_question.value];
}
