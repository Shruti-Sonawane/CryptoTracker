const form = document.querySelector('#searchForm');
const res = document.querySelector('#tableResult');
var upd;
form.addEventListener('submit',(e)=>{

    e.preventDefault();
    if(upd){
        clearTimeout(upd);
    }

    const ctype = form.elements.coinType.value;

    fetchPrice(ctype);

});


const fetchPrice= async(ctype) =>{
    const r = await axios.get(`https://api.coinstats.app/public/v1/coins/${ctype}?currency=USD`);
    console.log(r.data.coin.price);
     const price = r.data.coin.price;
     const volume  = r.data.coin.volume;
     const change = r.data.coin.priceChange1d;
     const base = r.data.coin.name;
     const rank = r.data.coin.rank;
     const target = 'USD';
     var col= "green";
    if(change<0){
        col = "red";
    }

     res.innerHTML =`<tr class="bg-primary" style="color: white;">
     <td>
         Property
     </td>
     <td>Value</td>
 </tr>
 <tr>
     <td>
         ${base}
     </td>
     <td style="color:${col};">${price} ${target}</td>
 </tr>
 <tr>
     <td>
         Volume(24hrs)
     </td>
     <td>${volume}</td>
 </tr>
 <tr>
     <td>
         Change(24hrs)
     </td>
     <td style="color:${col};">${change}</td>
 </tr>
 <tr>
     <td>
         Rank
     </td>
     <td>${rank}</td>
 </tr>`

    upd = setTimeout(()=>fetchPrice(ctype),10000);

}
