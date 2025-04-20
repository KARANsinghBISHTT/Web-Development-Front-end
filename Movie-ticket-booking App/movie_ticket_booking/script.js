const moviesList = [
    { movieName: "Flash", price: 7 },
    { movieName: "Spiderman", price: 5 },
    { movieName: "Batman", price: 4 },
  ];
  
  const selectMovie = document.getElementById("selectMovie");
  const movieName = document.getElementById("movieName");
  const moviePrice = document.getElementById("moviePrice");
  const totalPrice = document.getElementById("totalPrice");
  const selectedSeatsHolder = document.getElementById("selectedSeatsHolder");
  const numberOfSeat = document.getElementById("numberOfSeat");
  const proceedBtn = document.getElementById("proceedBtn");
  const cancelBtn = document.getElementById("cancelBtn");
  const seats = document.querySelectorAll("#seatCont .seat:not(.occupied)");
  
  let selectedSeats = [];
  let currentMoviePrice = 7; // Default movie price
  
  // Populate movie dropdown
  moviesList.forEach((movie) => {
    const option = document.createElement("option");
    option.value = movie.price;
    option.text = movie.movieName;
    selectMovie.appendChild(option);
    option.addEventListener("change", () => {
      movieName.textContent = option.text;
      moviePrice.textContent = `$${option.value}`;
      currentMoviePrice = parseInt(option.value);
      updateTotalPrice();
    });
  });
  
  // Seat selection logic
  seats.forEach((seat) => {
    seat.addEventListener("click", () => {
      if (seat.classList.contains("selected")) {
        seat.classList.remove("selected");
        selectedSeats = selectedSeats.filter((s) => s !== seat);
      } else {
        seat.classList.add("selected");
        selectedSeats.push(seat);
      }
      updateTotalPrice();
      updateSelectedSeatsHolder();
    });
  });
  
  // Update total price
  function updateTotalPrice() {
    const total = selectedSeats.length * currentMoviePrice;
    totalPrice.textContent = `$${total}`;
    numberOfSeat.textContent = selectedSeats.length;
  }
  
  // Update selected seats holder
  function updateSelectedSeatsHolder() {
    if (selectedSeats.length === 0) {
      selectedSeatsHolder.innerHTML = '<span class="noSelected">No Seat Selected</span>';
    } else {
      selectedSeatsHolder.innerHTML = "";
      selectedSeats.forEach((seat) => {
        const seatNumber = Array.from(seat.parentNode.parentNode.children).indexOf(seat.parentNode) + 1; // Get seat number
        const rowNumber = Array.from(seat.parentNode.parentNode.parentNode.children).indexOf(seat.parentNode.parentNode) + 1; // Get row number
        const seatLabel = `Row ${rowNumber}, Seat ${seatNumber}`;
        const seatSpan = document.createElement("span");
        seatSpan.textContent = seatLabel;
        selectedSeatsHolder.appendChild(seatSpan);
      });
    }
  }
  
  // Continue button event listener
  proceedBtn.addEventListener("click", () => {
    if (selectedSeats.length === 0) {
      alert("Oops, no seat selected!");
    } else {
      alert("Yayy! Your Seats have been booked!");
      selectedSeats.forEach((seat) => {
        seat.classList.remove("selected");
        seat.classList.add("occupied");
      });
      selectedSeats = [];
      totalPrice.textContent = "$0";
      numberOfSeat.textContent = "0";
      updateSelectedSeatsHolder();
    }
  });
  
  // Cancel button event listener
  cancelBtn.addEventListener("click", () => {
    selectedSeats.forEach((seat) => {
      seat.classList.remove("selected");
    });
    selectedSeats = [];
    totalPrice.textContent = "$0";
    numberOfSeat.textContent = "0";
    updateSelectedSeatsHolder();
  });
  
  // Initial setup
  updateTotalPrice();
  updateSelectedSeatsHolder();