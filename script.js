const leftContainer = document.querySelector(".left-container")
const imageContainer = document.querySelector('.image-container')
const filtersForm = document.querySelector('#filters')
let urlEnd = ""
let page = 1

const getData = (page) => {
    fetch(`https://picsum.photos/v2/list?page=${page}`)
        .then(res => res.json())
        .then(list => {
            list.map(image => loadImage(image))
        })
}
const loadImage = (image) => {
    const img = document.createElement('div')
    img.style.backgroundImage = `url("${image.download_url}") `
    img.classList.add("list-img")
    img.addEventListener("click", () => {
        imageContainer.innerHTML = `
                <div class="img-div">
                    <img src=${image.download_url+urlEnd} alt="" class="image" style="max-height: 100%; max-width: 100%" onerror="imgError()" >
                </div>
                <div class="image-info">
                    <span class="author-info">Author: ${image.author}</span>  <span class="size-info">Size: ${image.width}x${image.height}</span>
                </div>
                 `
    })
    leftContainer.append(img)
}
const imgError = () => {
    imageContainer.innerHTML = `
                <div class="error-div">
                   <h2>Image could not be loaded :( Please try again or choose a different image.</h2>
                </div>
                 `
}
filtersForm.addEventListener('input', () => {
    const checkedValue = document.querySelector('#grayscale').checked;
    const sliderValue = document.querySelector('#myRange').value;
    const grayscale = checkedValue ? "?grayscale" : "";
    const slider = sliderValue >= 1 ? `?blur=${sliderValue}` : "";
    document.querySelector('.slider-output').innerHTML = "Blur:" + sliderValue
    urlEnd = ""
    if (checkedValue) {urlEnd = grayscale}
    if (slider) {urlEnd = slider}
    if (grayscale && sliderValue > 0) {urlEnd = `?grayscale&blur=${sliderValue}`}
    return urlEnd
})
leftContainer.addEventListener("scroll", () => {
    leftContainer.scrollHeight - leftContainer.scrollTop === 883 ? page++ && getData(page) : null
})
getData(page)




