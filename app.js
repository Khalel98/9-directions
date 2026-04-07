(function () {
  "use strict";

  const STORAGE_KEY = "selfdev-todo-v3";

  /**
   * Порядок задач: от простого к более сложному.
   * @type {Record<string, { label: string, short: string, icon: string, weeklyGoal: string, startSteps: string[], tasks: { id: string, title: string, desc: string }[] }>}
   */
  const MANIFEST = {
    reviews: {
      label: "Рецензии",
      short: "Рецензии",
      icon: "✍️",
      weeklyGoal: "2 рецензии за неделю.",
      startSteps: [
        "Возьми простой фильм: «Интерстеллар» или сериал, который уже смотрел.",
        "Напиши 5 предложений: о чём / что понравилось / что нет / одна мысль / оценка.",
      ],
      tasks: [
        {
          id: "r1",
          title: "Написать рецензию на 1 фильм",
          desc: "Любой просмотренный фильм — по структуре из блока «С чего начать».",
        },
        {
          id: "r2",
          title: "Написать рецензию на 1 книгу",
          desc: "Сюжет, герои, стиль, кому зайдёт.",
        },
        {
          id: "r3",
          title: "Короткая рецензия (до 3 предложений)",
          desc: "Минимум текста — максимум сути.",
        },
        {
          id: "r4",
          title: "Структурированная рецензия",
          desc: "Вступление / анализ / вывод.",
        },
        {
          id: "r5",
          title: "Выложить куда-нибудь",
          desc: "Телеграм, заметки, блог — чтобы текст не пропал.",
        },
      ],
    },
    poetry: {
      label: "Стихи",
      short: "Стихи",
      icon: "📜",
      weeklyGoal: "1 стих за неделю.",
      startSteps: [
        "Возьми короткое стихотворение Александра Пушкина.",
        "Учить по 2–4 строки в день.",
      ],
      tasks: [
        {
          id: "p1",
          title: "Выучить одно короткое стихотворение",
          desc: "Дословно, с паузами и ударениями.",
        },
        {
          id: "p2",
          title: "Прочитать вслух",
          desc: "Несколько раз подряд, пока не путаешь слова.",
        },
        {
          id: "p3",
          title: "Записать себя на аудио",
          desc: "Послушай интонацию и места, где спотыкаешься.",
        },
        {
          id: "p4",
          title: "Выучить стих другого автора",
          desc: "Например, Сергей Есенин — сравни ритм и образы.",
        },
        {
          id: "p5",
          title: "Рассказать кому-нибудь",
          desc: "Живой слушатель или голосовое в чат.",
        },
      ],
    },
    geography: {
      label: "География",
      short: "География",
      icon: "🌍",
      weeklyGoal: "20 новых объектов (страны, столицы, реки, горы — в сумме).",
      startSteps: [
        "Открой карту мира (например, Google Maps).",
        "Выучи 10 стран и их столицы.",
      ],
      tasks: [
        {
          id: "g1",
          title: "Казахстан и соседние страны",
          desc: "Границы, столицы, кто с кем граничит.",
        },
        {
          id: "g2",
          title: "10 столиц Европы",
          desc: "Страна — столица, без подсказок, потом проверка.",
        },
        {
          id: "g3",
          title: "5 рек мира",
          desc: "Где берут начало, куда впадают, через какие страны.",
        },
        {
          id: "g4",
          title: "5 горных систем",
          desc: "Хребты и где они на карте.",
        },
        {
          id: "g5",
          title: "3 страны, где хочешь побывать",
          desc: "Почему именно они — и что там посмотреть.",
        },
      ],
    },
    sketching: {
      label: "Скетчинг",
      short: "Скетчинг",
      icon: "✏️",
      weeklyGoal: "5 рисунков за неделю.",
      startSteps: [
        "Купи простой блокнот и карандаш.",
        "Рисуй 10 минут в день.",
      ],
      tasks: [
        {
          id: "s1",
          title: "Нарисовать кружку",
          desc: "Контур, пропорции, простая тень.",
        },
        {
          id: "s2",
          title: "Нарисовать руку",
          desc: "Упрощённые формы пальцев и ладони.",
        },
        {
          id: "s3",
          title: "Нарисовать комнату",
          desc: "Перспектива «на глаз»: угол, мебель, свет.",
        },
        {
          id: "s4",
          title: "Быстрые наброски (1–2 минуты)",
          desc: "Несколько предметов подряд — скорость важнее деталей.",
        },
        {
          id: "s5",
          title: "Повторить рисунок с картинки",
          desc: "Копия референса: линии и массы как у оригинала.",
        },
      ],
    },
    music: {
      label: "Музыка",
      short: "Музыка",
      icon: "🎵",
      weeklyGoal: "2 альбома за неделю.",
      startSteps: [
        "Открой список «1001 Albums You Must Hear Before You Die».",
        "Начни с классики.",
      ],
      tasks: [
        {
          id: "m1",
          title: "Послушать альбом Abbey Road — The Beatles",
          desc: "От первого до последнего трека, без перемешивания.",
        },
        {
          id: "m2",
          title: "Выписать 3 любимых трека",
          desc: "С альбома недели — и коротко, почему они зашли.",
        },
        {
          id: "m3",
          title: "Послушать альбом 90-х",
          desc: "Любой из списка или рекомендаций — целиком.",
        },
        {
          id: "m4",
          title: "Попробовать новый жанр",
          desc: "Минимум получаса — зафиксируй впечатление.",
        },
        {
          id: "m5",
          title: "Сделать плейлист",
          desc: "Связная подборка с заходом и финалом.",
        },
      ],
    },
    documentaries: {
      label: "Документальные фильмы",
      short: "Док. фильмы",
      icon: "🎬",
      weeklyGoal: "1–2 фильма за неделю.",
      startSteps: ["Выбери тему: космос / бизнес / психология."],
      tasks: [
        {
          id: "d1",
          title: "Посмотреть Our Planet",
          desc: "Серия или фильм из цикла — внимание на картинку и факты.",
        },
        {
          id: "d2",
          title: "Записать 5 фактов",
          desc: "После просмотра — что запомнилось дословно.",
        },
        {
          id: "d3",
          title: "Фильм про бизнес",
          desc: "Док про компанию, стартап или экономику.",
        },
        {
          id: "d4",
          title: "Историческая документалка",
          desc: "Событие, эпоха или личность — с датами.",
        },
        {
          id: "d5",
          title: "Краткое резюме",
          desc: "5–7 предложений: о чём фильм и главный вывод.",
        },
      ],
    },
    howitworks: {
      label: "Как это работает",
      short: "Как это работает",
      icon: "⚙️",
      weeklyGoal: "Разобрать 1 механизм или систему.",
      startSteps: ["Выбери простую вещь: Wi‑Fi или замок."],
      tasks: [
        {
          id: "h1",
          title: "Как работает Wi‑Fi",
          desc: "Роутер, сигнал, устройство — своими словами, без жаргона.",
        },
        {
          id: "h2",
          title: "Как работает двигатель",
          desc: "В общих чертах: топливо, поршни, вращение.",
        },
        {
          id: "h3",
          title: "Как работает самолёт",
          desc: "Подъёмная сила и тяга — образно.",
        },
        {
          id: "h4",
          title: "Как работает интернет",
          desc: "От запроса в браузере до ответа сервера — цепочка простыми словами.",
        },
        {
          id: "h5",
          title: "Объяснить это простыми словами",
          desc: "Выбери одну тему из списка и расскажи за 2 минуты без шпаргалки.",
        },
      ],
    },
    art: {
      label: "Искусство",
      short: "Искусство",
      icon: "🖼️",
      weeklyGoal: "1 произведение за неделю — разобрать и описать.",
      startSteps: ["Выбери одну известную картину."],
      tasks: [
        {
          id: "a1",
          title: "Разобрать «Мону Лизу»",
          desc: "Композиция, взгляд, техника, где хранится.",
        },
        {
          id: "a2",
          title: "Узнать про Леонардо да Винчи",
          desc: "Биография и другие известные работы.",
        },
        {
          id: "a3",
          title: "Посмотреть контекст эпохи",
          desc: "Возрождение: что ценили в искусстве тогда.",
        },
        {
          id: "a4",
          title: "Найти скрытые детали",
          desc: "По статьям или разбору: символы, детали фона.",
        },
        {
          id: "a5",
          title: "Описать своими словами",
          desc: "Что чувствуешь и почему картина известна.",
        },
      ],
    },
    cuisines: {
      label: "Кухни мира",
      short: "Кухни мира",
      icon: "🍳",
      weeklyGoal: "1 блюдо за неделю.",
      startSteps: ["Выбери простое блюдо — не перегружай первый раз."],
      tasks: [
        {
          id: "c1",
          title: "Приготовить пасту карбонару",
          desc: "Классический рецепт или близкий к нему.",
        },
        {
          id: "c2",
          title: "Приготовить азиатское блюдо",
          desc: "Вок, суп, лапша — на выбор.",
        },
        {
          id: "c3",
          title: "Попробовать новый ингредиент",
          desc: "Соус, специя или овощ, с которым не готовил.",
        },
        {
          id: "c4",
          title: "Пригласить кого-то на дегустацию",
          desc: "Хотя бы один отзыв — что зашло, что нет.",
        },
        {
          id: "c5",
          title: "Записать рецепт",
          desc: "Свои дозировки и правки — чтобы повторить.",
        },
      ],
    },
  };

  const CATEGORY_ORDER = [
    "reviews",
    "poetry",
    "geography",
    "sketching",
    "music",
    "documentaries",
    "howitworks",
    "art",
    "cuisines",
  ];

  const tabbar = document.querySelector(".tabbar");
  const taskPanel = document.getElementById("task-panel");
  const taskList = document.getElementById("task-list");
  const startStepsEl = document.getElementById("start-steps");
  const weeklyGoalEl = document.getElementById("weekly-goal");
  const tasksProgressEl = document.getElementById("tasks-progress");
  const filterButtons = document.querySelectorAll(".filter-btn");

  let activeCategory = CATEGORY_ORDER[0];
  let filter = "all";

  /** @type {{ done: Record<string, Record<string, boolean>>, weeklyGoals: Record<string, string> }} */
  let state = loadState();

  function defaultState() {
    return { done: {}, weeklyGoals: {} };
  }

  function loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return defaultState();
      const parsed = JSON.parse(raw);
      if (typeof parsed !== "object" || parsed === null) return defaultState();
      if (!parsed.done || typeof parsed.done !== "object") parsed.done = {};
      if (!parsed.weeklyGoals || typeof parsed.weeklyGoals !== "object") parsed.weeklyGoals = {};
      for (const id of CATEGORY_ORDER) {
        if (!parsed.done[id]) parsed.done[id] = {};
      }
      return parsed;
    } catch {
      return defaultState();
    }
  }

  function saveState() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }

  function isDone(catId, taskId) {
    return !!state.done[catId]?.[taskId];
  }

  function setDone(catId, taskId, done) {
    if (!state.done[catId]) state.done[catId] = {};
    state.done[catId][taskId] = done;
    saveState();
  }

  function getWeeklyGoal(catId) {
    const custom = state.weeklyGoals[catId];
    if (typeof custom === "string" && custom.trim() !== "") return custom;
    return MANIFEST[catId].weeklyGoal;
  }

  function renderTabs() {
    tabbar.innerHTML = "";
    CATEGORY_ORDER.forEach((id) => {
      const cat = MANIFEST[id];
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "tab";
      btn.setAttribute("role", "tab");
      btn.setAttribute("aria-selected", id === activeCategory ? "true" : "false");
      btn.id = `tab-${id}`;
      btn.dataset.category = id;
      btn.title = cat.label;

      const iconEl = document.createElement("span");
      iconEl.className = "tab__icon";
      iconEl.setAttribute("aria-hidden", "true");
      iconEl.textContent = cat.icon;

      const lab = document.createElement("span");
      lab.className = "tab__text";
      lab.textContent = cat.short;

      btn.append(iconEl, lab);
      btn.addEventListener("click", () => selectCategory(id));
      tabbar.appendChild(btn);
    });

    tabbar.querySelectorAll('[role="tab"]').forEach((tab) => {
      tab.tabIndex = tab.dataset.category === activeCategory ? 0 : -1;
    });
  }

  function selectCategory(id) {
    activeCategory = id;
    filter = "all";
    syncFilterButtons();
    renderTabs();
    renderPanel();
    const active = tabbar.querySelector(`[data-category="${id}"]`);
    if (active) active.focus();
  }

  function syncFilterButtons() {
    filterButtons.forEach((b) => {
      b.classList.toggle("is-active", b.dataset.filter === filter);
    });
  }

  function getManifestTasks(catId) {
    return MANIFEST[catId].tasks;
  }

  function getVisibleTasks(catId) {
    const tasks = getManifestTasks(catId);
    if (filter === "active") return tasks.filter((t) => !isDone(catId, t.id));
    if (filter === "done") return tasks.filter((t) => isDone(catId, t.id));
    return tasks;
  }

  function updateProgress(catId) {
    const tasks = getManifestTasks(catId);
    const n = tasks.length;
    const k = tasks.filter((t) => isDone(catId, t.id)).length;
    tasksProgressEl.textContent = n ? `${k} / ${n}` : "";
  }

  function renderPanel() {
    const catId = activeCategory;
    const m = MANIFEST[catId];
    if (taskPanel) taskPanel.setAttribute("aria-labelledby", `tab-${catId}`);

    startStepsEl.innerHTML = "";
    m.startSteps.forEach((step) => {
      const li = document.createElement("li");
      li.textContent = step;
      startStepsEl.appendChild(li);
    });

    weeklyGoalEl.oninput = null;
    weeklyGoalEl.value = getWeeklyGoal(catId);
    weeklyGoalEl.oninput = () => {
      const v = weeklyGoalEl.value;
      if (v.trim() === "") delete state.weeklyGoals[catId];
      else state.weeklyGoals[catId] = v;
      saveState();
    };

    taskList.innerHTML = "";
    const visible = getVisibleTasks(catId);
    updateProgress(catId);

    if (visible.length === 0) {
      const li = document.createElement("li");
      li.className = "task-empty";
      li.textContent =
        filter === "done"
          ? "Пока нет выполненных — отметьте задачи выше."
          : "Нет задач в этом фильтре.";
      taskList.appendChild(li);
      return;
    }

    for (const t of visible) {
      const done = isDone(catId, t.id);
      const li = document.createElement("li");
      li.className = "task" + (done ? " task--done" : "");

      const check = document.createElement("button");
      check.type = "button";
      check.className = "task__check";
      check.setAttribute("aria-pressed", done ? "true" : "false");
      check.setAttribute(
        "aria-label",
        done ? "Снять отметку: " + t.title : "Выполнено: " + t.title
      );
      check.addEventListener("click", () => {
        setDone(catId, t.id, !done);
        renderPanel();
      });

      const body = document.createElement("div");
      body.className = "task__body";
      const title = document.createElement("p");
      title.className = "task__title";
      title.textContent = t.title;
      const desc = document.createElement("p");
      desc.className = "task__desc";
      desc.textContent = t.desc;
      body.append(title, desc);

      li.append(check, body);
      taskList.appendChild(li);
    }

    updateProgress(catId);
  }

  filterButtons.forEach((b) => {
    b.addEventListener("click", () => {
      filter = b.dataset.filter || "all";
      syncFilterButtons();
      renderPanel();
    });
  });

  tabbar.addEventListener("keydown", (e) => {
    const tabs = [...tabbar.querySelectorAll('[role="tab"]')];
    const i = tabs.indexOf(document.activeElement);
    if (i < 0) return;
    if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
      e.preventDefault();
      const dir = e.key === "ArrowRight" ? 1 : -1;
      const next = (i + dir + tabs.length) % tabs.length;
      const id = tabs[next].dataset.category;
      if (id) selectCategory(id);
    }
  });

  renderTabs();
  syncFilterButtons();
  renderPanel();
})();
