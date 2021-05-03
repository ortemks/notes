if (localStorage.getItem('notes') === null) {} else {
    document.querySelector('.containerfornotes').insertAdjacentHTML(
        'afterbegin',
        `${localStorage.getItem('notes')}`
    )
};
function addTextInput () {
    function addTextarea () {
        document.body.insertAdjacentHTML(
            'afterend',
            `<div class="container"> 
                 <div class="noteinput">
                     <div class="buttons">
                         <div class="back">
                             <button onclick="onclickDelete();">Отмена</button>
                         </div>
                         <div class="add">
                             <button onclick="onclickAdd();">Добавить</button>
                         </div>
                         <div class="date">
                             <input id="selecteddate" value="" type="date" class="dateinput">
                         </div>
                     </div>
                     <div class="textinput">
                         <textarea id="idtextaera" placeholder="Текст заметки..." wrap="hard"></textarea>
                     </div>
                 </div>
             </div>`
        );
    };
    addTextarea ();
    function currentDate(){
        function zeroToDate (date) {
            if (date < 10) {
                date = '0' + date;
            } else {
                date = date;
            }
            return date;
        }
        let allDate = new Date();
        let day = zeroToDate(allDate.getDate()) ;
        let month = String(zeroToDate(+allDate.getMonth() + 1));
        let year = allDate.getFullYear();
        return year + '-' + month + '-' + day;
    };
    document.querySelector('.dateinput').value = currentDate();
    document.querySelector('textarea').addEventListener('keyup', function(){
        if (this.scrollTop > 0){
            this.style.height = this.scrollHeight + 'px';
        }
    });
    document.body.classList.add('blurbackground');
    document.querySelector('.textaboutbutton').classList.remove('plushover');
}       
function onclickDelete () {
    document.querySelector('.container').remove();
    document.body.classList.remove('blurbackground');
    document.querySelector('.textaboutbutton').classList.add('plushover');
}
function onclickAdd () {
   document.querySelector('.containerfornotes').insertAdjacentHTML(
        'afterbegin',
        `<div class="addednotecontainer">
            <div class="addednote">
                <div class="addednotetext"></div>
                <div class="dateaddednote"></div>
            </div>
            <div class="deletenote">
            <button class="deletebutton" onclick="this.closest('.addednotecontainer').remove(); localStorage.setItem('notes', document.querySelector('.containerfornotes').innerHTML)">
                    <div class="firstline"></div>
                    <div class="lastline"></div>
                </button>
            </div> 
        </div>`
    );
    document.querySelector('.dateaddednote').textContent = document.getElementById('selecteddate').value;
    document.querySelector('.addednotetext').textContent = document.getElementById('idtextaera').value;
    document.querySelector('.container').remove();
    document.body.classList.remove('blurbackground');
    document.querySelector('.textaboutbutton').classList.add('plushover');
    let currentnote = document.querySelector('.containerfornotes').firstChild;
    while (currentnote.nextSibling != null) { 
        if (Date.parse(currentnote.querySelector('.dateaddednote').textContent) < Date.parse(currentnote.nextSibling.querySelector('.dateaddednote').textContent)){
            currentnote.nextSibling.after(currentnote);
        } else {
            break;
        }
    }
    localStorage.setItem('notes', document.querySelector('.containerfornotes').innerHTML);
}
