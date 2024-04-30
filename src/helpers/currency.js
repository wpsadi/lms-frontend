import axios from "axios"


export class currencyClass {
    constructor(){
        this.api = "https://open.er-api.com/v6/latest/USD"
        this.ExtraDataAPI = "https://restcountries.com/v3.1/currency" 
        this.allDataAPI = "https://restcountries.com/v3.1/all" 
    }
      async getCurrency(){
        try{
            const res = await axios.get(this.api)
            const fullData = await axios.get(this.allDataAPI)
            const currencies = Object.keys(res.data.rates)

            const lumsumData = new Object();

            const availFullData = new Array();


            for (let country of fullData.data){
                if (country.currencies){
                    availFullData.push(country)
                }
            }

            for (let currency of currencies){
                const country = availFullData.filter((country) => {
                    // console.log(country.currencies)
                    if (Object.keys(country.currencies) >1){
                        null
                        // console.log(Object.keys(country.currencies)[0])
                    }
                    return Object.keys(country.currencies)[0] === currency.toUpperCase()})
                // console.log(country)
                
                if (country.length > 0){
                    if (!lumsumData[currency]){
                        lumsumData[currency] = country[0]
                    }
                    
                }
            }


            return {
                status:200,
                resp:lumsumData
            }
        }catch(e){
            return {
                status:500,
                resp:e.message
            }
        }

    }
}

