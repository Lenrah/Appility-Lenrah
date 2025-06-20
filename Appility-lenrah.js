const Api = "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";
const inp = document.getElementById('inp')
const images = document.querySelector('.Images')

const getImage = async () => {
    // Make a request to api
    const methods = {
        method:"POST",
        headers:{
            "Content-type":"application/json",
            "Authorization":`Bearer ${Api}`
        },
        body:JSON.stringify(
            {
                "Prompt":inp.value,
                "n":3,
                "size":"256×256"
            }
        )
    }
    const res = await fetch("https://api.openai.com/v1/images/generations", methods)
    // Parse the respose as json
    const data = await res.json()
    const ListImages = data.data;
    images.innerHTML = ''
    ListImages.map(photo => {
        const container = document.createElement("div")
        images.append(container)
        const img = document.createElement("img")
        container.append(img)
        img.src = photo.url
    })
}