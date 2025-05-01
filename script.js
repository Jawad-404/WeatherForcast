const ele=document.getElementById('button');
const input=document.getElementById('city');

const cityName=document.getElementById('city-name');
const cityTime=document.getElementById('time');
const cityTemp=document.getElementById('temp');

async function getData(cityName){
    const promise=await fetch(`https://api.weatherapi.com/v1/current.json?key=d578a993838b4c068f970157250105&q=${cityName}&aqi=yes`);
    return await promise.json();

}
ele.addEventListener('click', async ()=>{
    const value=input.value;
    const result=await getData(value);
    cityName.innerText=`Location: ${result.location.name},${result.location.region} - ${result.location.country}`;
    cityTime.innerText=`Time: ${result.location.localtime}`;
    cityTemp.innerText=`Temp: ${result.current.temp_c}°C`
})