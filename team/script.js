document.addEventListener("DOMContentLoaded", function() {
    const teamMembers = [
      { name: "Gilang Wiko Wicaksono", role: "team leader", imageUrl: "/assets/anggota/Gilang.png", link: "john_profile.html" },
      { name: "Mamang Hitler", role: "Front End", imageUrl: "/silvia_01.jpeg", link: "john_profile.html" },
      { name: "Mamang Hitler", role: "Front End", imageUrl: "/silvia_02.jpg", link: "john_profile.html" },
      { name: "Riska", role: "Front End", imageUrl: "/assets/anggota/Riskamawarni_Laia.jpg", link: "john_profile.html" },
      { name: "Mamang Hitler", role: "Front End", imageUrl: "/assets/anggota/adolf.jpeg", link: "john_profile.html" },
      { name: "Fajar", role: "deployment", imageUrl: "/assets/anggota/fajar.jpeg", link: "john_profile.html" },
      { name: "Mamang Hitler", role: "deployment", imageUrl: "/assets/anggota/adolf.jpeg", link: "john_profile.html" },
      { name: "Lilis Surwangi", role: "Pitch Deck", imageUrl: "/assets/anggota/Lilis_Surwangi.JPG", link: "john_profile.html" },
      { name: "Ririn", role: "Pitch Deck", imageUrl: "/assets/anggota/Ririn_cute.jpg", link: "john_profile.html" },
      { name: "Syifa Aulia Zahra", role: "Pitch Deck", imageUrl: "/assets/anggota/Syifa_Auliya_Zahra .jpg", link: "john_profile.html" },
      { name: "Dyah Ayu Pitaloka", role: "Pitch Deck", imageUrl: "/assets/anggota/dyah.jpg", link: "john_profile.html" },
      { name: "Putri Nadia N", role: "Pitch Deck", imageUrl: "/assets/anggota/Putri_Nadia_N.jpg", link: "john_profile.html" },
      { name: "Dziahulhaj Fadhil", role: "Pitch Deck", imageUrl: "/assets/anggota/Dziaulhaj_Fadhil.jpg", link: "john_profile.html" },
      // Tambahkan data anggota tim lainnya sesuai kebutuhan
    ];
    const specialMembers = [
        { name: "Kak Aul", role: "Mentor SE", imageUrl: "/assets/anggota/kak_aul.png", link: "special1_profile.html" },
        { name: "Kak inaa", role: "Mentor DA", imageUrl: "/assets/anggota/kak_ina.png", link: "special2_profile.html" }
      ];
      
 

      const teamCardsContainer = document.getElementById("teamCards");
      const specialCardsContainer = document.getElementById("specialCards");
    
      const createCard = (member) => {
        const card = document.createElement("div");
        card.classList.add("team-card");
        card.innerHTML = `
          <img src="${member.imageUrl}" alt="${member.name}">
          <div class="team-card-info">
            <h3>${member.name}</h3>
            <span class="role-label ${member.role.toLowerCase().replace(' ', '-')}">${member.role}</span>
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
