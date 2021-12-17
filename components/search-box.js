const searchElement = document.createElement('template');

searchElement.innerHTML = `
<input class="search-box-container" type="search" autocomplete="off" id="search-box-input" placeholder="What do you feel like eating today?..."/>
`;

class SearchBox extends HTMLElement{
    constructor(){
        super();
        // const shadow = this.attachShadow({mode: 'open'});
        this.appendChild(searchElement.content.cloneNode(true));
        // const styles = this.getAttribute('class')
        // this.shadowRoot.querySelector('input').setAttribute('class', styles);
        // this.shadowRoot.querySelector('div').innerText = this.getAttribute('title');
        // this.shadowRoot.querySelector('img').src = this.getAttribute('avatar');
    }

    // connectedCallback(){
    //     this.title = this.getAttribute("title")
    //     // this.render();
    // }
    // //
    // render(){
    //     this.appendChild(searchElement)
    // }
}
window.customElements.define('search-box', SearchBox);
