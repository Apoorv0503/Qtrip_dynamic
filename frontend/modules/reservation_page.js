import config from "../conf/index.js";

//Implementation of fetch call to fetch all reservations
async function fetchReservations() {
  // TODO: MODULE_RESERVATIONS
  // 1. Fetch Reservations by invoking the REST API and return them

  try{
    const data= await fetch(config.backendEndpoint+`/reservations/`);
   return await data.json();
    
   }
  catch{
    return null;

  }

  // Place holder for functionality to work in the Stubs
  // return null;
}

//Function to add reservations to the table. Also; in case of no reservations, display the no-reservation-banner, else hide it.
function addReservationToTable(reservations) {
  // TODO: MODULE_RESERVATIONS
  // 1. Add the Reservations to the HTML DOM so that they show up in the table
  /*
    Iterating over reservations, adding it to table (into div with class "reservation-table") and link it correctly to respective adventure
    The last column of the table should have a "Visit Adventure" button with id=<reservation-id>, class=reservation-visit-button and should link to respective adventure page

    Note:
    1. The date of adventure booking should appear in the format D/MM/YYYY (en-IN format) Example:  4/11/2020 denotes 4th November, 2020
    2. The booking time should appear in a format like 4 November 2020, 9:32:31 pm

  */

    //------Conditionally render the no-reservation-banner or reservation-table-parent based on----------
    // whether the input reservations is empty or not.

    if(reservations.length===0){
      document.getElementById("reservation-table-parent").style.display="none";
      document.getElementById("no-reservation-banner").style.display="block";

    }
    else{
      document.getElementById("no-reservation-banner").style.display="none";
      document.getElementById("reservation-table-parent").style.display="block";

    }



//  console.log("reservations array: ");
//  console.log(reservations);
     
    
      // ISO dates can be written with added hours, minutes, and seconds (YYYY-MM-DDTHH:MM:SSZ) ,
      //used in date property of reservation elements, do this to convert ISO to js date object formate-> const d = new Date("2015-03-25T12:00:00Z");
  
      
      //you can do: date.toLocaleDateString("en-IN")= DD/MM/YYYY

      // 1. The toLocaleDateString() method returns the date (not the time) of a date object as a string, using locale conventions.
      // 2. toLocaleTimeString() returns the time portion of a date, as a string, using locale conventions eg: 18:48:01
      // 3. toLocaleString() returns a date as a string, using locale settings. eg: 21/09/2023, 18:53:03

      reservations.forEach(element => {
      let new_row=document.createElement("tr");
      //------------------to get aventure's scheduled time-----------
      let adv_date=new Date(element.date);

      let final_short_date=adv_date.toLocaleDateString("en-IN");


      //---------------------- to get booking date-----------------
      let date_time=new Date(element.time);

      //for date part----actually after this part: curr_time, no need to do this formating in parts
      let day=date_time.getDate();
      let month=date_time.toLocaleString('default', { month: 'long' }); //getMonth():	Get month as a number (0-11) , but here we are taking fullname
      let year=date_time.getFullYear(); 

      //for time part, directly poora hi formate kr diya(date + time)
      let curr_time=date_time.toLocaleString('en-IN',{day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', second:'numeric', hour12: true });
      let final_curr_date=curr_time.replace(" at",",");
      // For en-IN: "4 November 2020, 9:32:31 pm",and en-US: "November 4, 2020, 9:32:31 PM".

      // date_time.toLocaleString('en-IN',{day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', second:'numeric', hour12: true });=21 September 2023 at 3:03:02 pm
      //but if we add replace(" at",",") then= 21 September 2023, 3:04:17 pm

      // console.log(curr_time);
      // now in our workspace, date_time.toLocaleString()=21/09/2023, 18:53:03 and after split(" ")= [ '9/21/2023,', '2:21:21']
      
      new_row.innerHTML=`
      <td>${element.id}</td>
      <td>${element.name}</td>
      <td>${element.adventureName}</td>
      <td>${element.person}</td>
      <td>${final_short_date}</td>
      <td>${element.price}</td>
      <!-- <td>${day} ${month} ${year}, "${curr_time[1]} ${curr_time[2]}</td> ,no need to this now-->
      <td>${final_curr_date}</td>
      <td id="${element.id}">
      <a href="../detail/?adventure=${element.adventure}">
      <button class="reservation-visit-button">Visit Adventure</button>
      </a>
      </td>

      <!--for href of above <a> see the url of reservations page and adv_details page -->
      
    `;
    let myTable= document.getElementById("reservation-table");
    myTable.append(new_row);
});

//one obj element of reservation array:
// {
// name: "Holl",
// date: "2023-10-06T00:00:00.000Z",
// person: "4",
// adventure: "1773524915",
// adventureName: "Fort Sion",
// price: 10744,
// id: "59fd47156fd3b92f",
// time: "Thu Sep 21 2023 13:32:16 GMT+0530 (India Standard Time)"
// }

    

}

export { fetchReservations, addReservationToTable };
