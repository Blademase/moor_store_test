document.addEventListener("DOMContentLoaded", function () {
    const allProjects = [
        {
            id: 1,
            name: 'Ынтымак',
            status: 'Строится',
            location: 'Жибек-Жолу 8а · Центр отдыха',
            image: 'assets/images/project1.png',
            type: 'residential'
        },
        {
            id: 2,
            name: 'Tower',
            status: 'Завершён',
            location: 'ул. Чынгыз Айтматова · Жилой дом',
            image: 'assets/images/project2.png',
            type: 'residential'
        },
        {
            id: 3,
            name: 'Royal Resort',
            status: 'Строится',
            location: 'Ч.МуслИма Куты · Центр отдыха',
            image: 'assets/images/project3.png',
            type: 'resort'
        },
        {
            id: 4,
            name: 'Cambridge',
            status: 'Завершён',
            location: 'Масалиев 279 · Жилой дом',
            image: 'assets/images/project4.png',
            type: 'residential'
        }
    ];

    const container = document.getElementById('projectsGrid');
    const buttons = document.querySelectorAll('[data-type]');
    const select = document.querySelector('.projects__select');

    function renderProjects(type = 'all') {
        const filtered = type === 'all' ? allProjects : allProjects.filter(p => p.type === type);
        container.innerHTML = filtered.map(project => `
      <div class="project-card">
        <div class="project-card__badge badge--${project.status === 'Завершён' ? 'green' : 'orange'}">${project.status}</div>
        <h3 class="project-card__title">${project.name}</h3>
        <p class="project-card__desc">${project.location}</p>
        <img src="${project.image}" alt="${project.name}" />
      </div>
    `).join('');
    }

    function renderCustom(list) {
        container.innerHTML = list.map(project => `
      <div class="project-card">
        <div class="project-card__badge badge--${project.status === 'Завершён' ? 'green' : 'orange'}">${project.status}</div>
        <h3 class="project-card__title">${project.name}</h3>
        <p class="project-card__desc">${project.location}</p>
        <img src="${project.image}" alt="${project.name}" />
      </div>
    `).join('');
    }

    const locations = [...new Set(allProjects.map(p => p.location.split('·')[0].trim()))];
    locations.forEach(loc => {
        const option = document.createElement('option');
        option.value = loc;
        option.textContent = loc;
        select.appendChild(option);
    });

    select.addEventListener('change', () => {
        const selected = select.value;
        if (selected === "Выберите локацию") {
            renderProjects();
        } else {
            const filtered = allProjects.filter(p => p.location.includes(selected));
            renderCustom(filtered);
        }
    });

    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            buttons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderProjects(btn.dataset.type);
        });
    });

    renderProjects();
});
