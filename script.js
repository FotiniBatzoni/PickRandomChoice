const tagsEl = document.getElementById('tags');
const textarea= document.getElementById('textarea');

textarea.focus();   //to have the cursor inside the textarea

textarea.addEventListener('keyup', (e)=>{
    createTags(e.target.value);

    //to pick up a choice when we press enter
    if(e.key==='Enter'){
            //we wait 10 miliseconds and then clear the input
            setTimeout(()=>{
                e.target.value= '';
            }, 10);


        randomSelect();
    }
});

function createTags(input){
    const tags= input.split(',') ///to create an array splitting by comma
                    .filter(tags=>tags.trim() !== '')  //if it's not equal to empty string
                    .map(tag=>tag.trim());      //it doesn't include white spaces

    tagsEl.innerHTML = ""; //clear the tags

    tags.forEach(tag =>{
        const tagEl = document.createElement('span');  //we creata a span
        tagEl.classList.add('tag');      //we add a class="tag"
        tagEl.innerHTML=tag;            //with the text whatever the tag is
        tagsEl.appendChild(tagEl);      //we append this tagEl to tagsEl

    });
}

function randomSelect(){
    const times =30;   //it highlights 30 times radomly before it stops

    const interval = setInterval(() =>{
        //the first tag we select randomly
        const randomTag = pickRandomTag();      //the index of tag

        highlightTag(randomTag);

        //we want to wait 100 ms and then unhighlight
        setTimeout(()=>{
            unHighlightTag(randomTag);
        },100);

    },100);

    
    setTimeout(()=>{
        clearInterval(interval);

        //pick a randon tag to stop on!
        setTimeout(()=>{
            const randomTag = pickRandomTag();

            highlightTag(randomTag);
        },100);

    },times * 100);
}

function pickRandomTag(){
    const tags = document.querySelectorAll('.tag');
    return tags[Math.floor(Math.random() * tags.length)];
    //the index of tags which returns is random
}

function highlightTag(tag){
    tag.classList.add('highlight');
}

function unHighlightTag(tag){
    tag.classList.remove('highlight');
}