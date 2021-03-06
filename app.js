window.onload = function () {
    // selected all element
    const addItem = document.querySelector('.submit');
    const inputField = document.querySelector('.input-field');
    const tasksBoard = document.querySelector('.tasksBoardUl');
    const removeItem = document.querySelector('#clear');

    addItem.addEventListener('submit', function (e) {
        e.preventDefault()
        
        createNewTask()
        inputField.value = ''
    })

    const createNewTask = () => {
        let div = document.createElement('div')
        let li = document.createElement('li')
        li.innerHTML = inputField.value

        
        const crossBtn = (parent) => {
            let span = document.createElement('span')
            span.className = 'cross-btn'
            span.style.cursor = 'pointer'
            span.innerHTML = `<i class="fas fa-times-circle"></i>`

            span.addEventListener('click', () => {
                parent.removeChild(div)
            })
            return span
        }

        div.appendChild(editTask(div))
        div.appendChild(crossBtn(tasksBoard))

        div.appendChild(li)
        tasksBoard.appendChild(div)
        return tasksBoard
    }

    const editTask = (parent) => {
        let span = document.createElement('span')
        span.className = 'edit-btn'
        span.innerHTML = `<i class="fas fa-pen-square"></i>`

        span.addEventListener('click', (event) => {
            let li = parent.querySelector('li')
            let textArea = document.createElement('textarea')
            textArea.style.width = li.offsetWidth + 'px'
            textArea.style.height = li.offsetHeight + 'px'
            textArea.style.resize = 'none'
            textArea.innerHTML = li.innerText

            textArea.addEventListener('keypress', function (event) {
                if (event.keyCode === 13) {
                    if (this.value) {
                        li.innerText = this.value
                        li.style.display = 'block'
                        parent.removeChild(textArea)
                    } else {
                        alert('Please Provide Some Value')
                    }
                }
            })
            
            parent.appendChild(textArea)
            li.style.display = 'none'
        })
        return span
    }

    // Task searching 
    addItem.addEventListener('keyup', () => {
        const parent = document.querySelector('.tasksBoardUl');
        const div = parent.querySelectorAll('div')
        const li = parent.querySelectorAll('li')
        for (let i = 0; i < tasksBoard.childNodes.length; i++){
            if (!li[i].innerHTML.includes(inputField.value)) {
                div[i].style.display = 'none'
            } else {
                div[i].style.display = 'block'
            }
        }
    })

    // added a addEventListener which remove all item 
    removeItem.addEventListener('click', (event) => {
        const allDiv = document.querySelectorAll('.tasksBoardUl div');
        for (let i = 0; i < allDiv.length; i++){
            let node = allDiv.item([i]);
            node.parentNode.removeChild(node);
        }
    })

}
