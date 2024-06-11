document.addEventListener("DOMContentLoaded", function() {
  const teamMembers = [
    { name: "Gilang Wiko ", roles: ["team leader", "Front End"], imageUrl: "./assets/anggota/iko.webp", link: "#" },
    { name: "Silvia Putri Anggreani", roles: ["Front End"], imageUrl: "./assets/anggota/silvia_01.webp", link: "#" },
    { name: "Rinaldi", roles: ["Front End"], imageUrl: "./assets/anggota/Rinaldi.webp", link: "#" },
    { name: "Riska", roles: ["Front End"], imageUrl: "./assets/anggota/Riskamawarni_Laia.webp", link: "#" },
    // { name: "hantu", roles: ["⭐"], imageUrl: "./assets/anggota/huahaha.jpg", link: "#" },
    { name: "Fajar", roles: ["deployment"], imageUrl: "./assets/anggota/fajar.webp", link: "#" },
    { name: "Arum", roles: ["deployment"], imageUrl: "./assets/anggota/rum.webp", link: "#" },
    { name: "Lilis Surwangi", roles: ["Pitch Deck"], imageUrl: "./assets/anggota/Lilis_Surwangi.webp", link: "#" },
    { name: "Ririn", roles: ["Pitch Deck"], imageUrl: "./assets/anggota/Ririn_cute.webp", link: "#" },
    { name: "Syifa Aulia Zahra", roles: ["Pitch Deck"], imageUrl: "./assets/anggota/Syifa_Auliya_Zahra.webp", link: "#" },
    { name: "Dyah Ayu Pitaloka", roles: ["Pitch Deck"], imageUrl: "./assets/anggota/dyah.webp", link: "#" },
    { name: "Putri Nadia N", roles: ["Pitch Deck"], imageUrl: "./assets/anggota/Putri_Nadia_N.webp", link: "#" },
    { name: "Dziahulhaj Fadhil", roles: ["Pitch Deck"], imageUrl: "./assets/anggota/Dziaulhaj.webp", link: "#" },
    // Tambahkan data anggota tim lainnya sesuai kebutuhan
  ];

  const specialMembers = [
    { name: "Kak Aul", roles: ["Mentor SE"], imageUrl: "./assets/anggota/kak_aul.webp", link: "#" },
    { name: "Kak inaa", roles: ["Mentor DA"], imageUrl: "./assets/anggota/kak_ina.webp", link: "#" }
  ];

  const teamCardsContainer = document.getElementById("teamCards");
  const specialCardsContainer = document.getElementById("specialCards");

  const createCard = (member) => {
    const card = document.createElement("div");
    card.classList.add("team-card");

    const roles = member.roles.map(role => `<span class="role-label ${role.toLowerCase().replace(' ', '-')}">${role}</span>`).join(", "); //ini beda dari yang aslinya

    card.innerHTML = `
      <img src="${member.imageUrl}" alt="${member.name}" loading="lazy">
      <div class="team-card-info">
        <h3>${member.name}</h3>
        <span>${roles}</span>
      </div>
    `;

    card.addEventListener("click", function() {
      window.location.href = member.link;
    });
    return card;
  };

  // Menambahkan card untuk anggota tim biasa
  teamMembers.forEach(member => {
    teamCardsContainer.appendChild(createCard(member));
  });

  // Menambahkan card untuk anggota tim istimewa
  specialMembers.forEach(member => {
    specialCardsContainer.appendChild(createCard(member));
  });
});
