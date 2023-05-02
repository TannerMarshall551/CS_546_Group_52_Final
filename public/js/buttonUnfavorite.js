const unfavoriteButton = document.getElementById("unfavorite-button");

unfavoriteButton.addEventListener("click", function() {
  const eventId = this.getAttribute("unfav-event-id");
  const userId = this.getAttribute("unfav-user-id");
  const action = this.getAttribute("unfav-action");

  if (!userId) {
      window.location.href = "/account/login";
    return;
  }

  if (action !== "unfavorite") {
    return;
  }

  fetch(`/users/${userId}`)
    .then(response => response.json())
    .then(user => {
      if (!user.favoritedEvents.includes(eventId)) {
        alert("You have not favorited this event.");
      } 
      else {
        user.favoritedEvents = user.favoritedEvents.filter(id => id !== eventId);
        const options = {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(user)
        };
        fetch(`/events/${eventId}?userId=${userId}&action=${action}`, options)
          .then(response => response.json())
          .then(updatedEvent => {
            alert("Event unfavorited.");
          })
          .catch(error => console.error(error));
      }
    })
    .catch(error => console.error(error));
});
