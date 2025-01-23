if('geolocation' in navigator){
    navigator.geolocation.getCurrentPosition((position)=>{
        console.log(position)
        var {latitude, longitude}=position.coords
        var map = L.map('map').setView([latitude, longitude], 13);
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(map);
        L.marker([latitude, longitude]).addTo(map).bindPopup("iam here.").openPopup();
        var search=document.getElementById("searchlocation")
        search.addEventListener("click", function(){
            var searchlocation=document.getElementById("searchlocation").value;
            fetch( `https://nominatim.openstreetmap.org/search?format=json&q=${searchlocation}`)
            .then(response=> response.json())
            .then(data=>{
                if(data.length>0){
                    var {lat,lon,display_name}=data[0];
                    map.setView([lat,lon],13);
                    L.marker([lat,lon]).addTo(map).bindPopup(display_name).openPopup();
                } else{
                    alert("location not foud")
                }
                
            })
            
            

        })
        null,
        
        {
            enableHighAccuracy:true,
timeout:10000,
maximumAge:0
        }
    })
}