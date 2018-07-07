const BASE_URL = "https://press4news.live/"

export const getNews = (pageCount)=>{
   return fetch(BASE_URL+'api/Data/news'+ (pageCount?('/'+pageCount):''))
}

export const getNewsById = (id)=>{
    console.log(id)
    return fetch(`${BASE_URL}api/Data/news_detail/${id}`)
}

export const getCategories = () =>{
    return fetch(`${BASE_URL}api/Data/category`)
}
export const getNewsByCategory = (category_id)=>{
    return fetch(`${BASE_URL}api/Data/category_news/${category_id}`)
}

export const getVideos  = (pageCount)=>{
    return (fetch(`${BASE_URL}api/Data/video/${pageCount}`))
}

export const getAudios = (pageCount)=>{
    return (fetch(`${BASE_URL}api/Data/mobile_audio`))
    
}

export const getAdvertisements=()=>{
    return fetch(`${BASE_URL}api/Data/advertisement`)
  }