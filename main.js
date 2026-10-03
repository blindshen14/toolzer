/* TOOLZER v1.6.2
   Swiss-knife UI toolkit for Obsidian (UPDATED WITH FIXES)
*/
const { Plugin, PluginSettingTab, Setting, Notice, MarkdownView, setIcon } = require('obsidian');

const I18N = {
  en: {
    scroll:'Scroll Speed', scrollLeft:'🐢 smooth', scrollRight:'⚡ fast',
    width:'Page Width', widthLeft:'📖 narrow', widthRight:'🖥 wide',
    bodyFont:'Body Font', uiFont:'UI Font', fontPreview:'The quick brown fox — Швидка лисиця',
    resetFonts:'↺ Reset fonts', fontDefault:'— Default —',
    lineSpacing:'Line Spacing', paraSpacing:'Paragraph Spacing', letterSpacing:'Letter Spacing', resetSpacing:'↺ Reset',
    highlight:'Selection Color', neonPresets:'Neon Presets', resetHighlight:'↺ Reset to yellow', highlightHint:'← Select this text to preview',
    headings:'Heading Decorations', headingsDesc:'Style each heading independently', resetHeadings:'↺ Clear all',
    emojiSearch:'🔍 Search (e.g. fire, heart, star)', emojiHint:'Click: insert  |  Right-click: copy',
    presetSave:'Save Current as Preset', presetName:'Preset name...', presetAdd:'+ Save', presetList:'Saved Presets', presetNone:'No presets yet.',
    sepia:'Sepia / Night Mode', sepiaToggle:'Enable sepia filter', sepiaIntensity:'Intensity',
    bullet:'Bullet Style', bulletCustom:'Custom emoji/symbol',
    textColor:'Text Color', textColorReset:'↺ Reset text color',
    typefaceSize:'Text Size', typefaceSizeLeft:'small', typefaceSizeRight:'large',
    paper:'Note Paper Texture', paperOpacity:'Opacity', paperColor:'Line Color',
    paperPatterns:{ none:'None', lined:'📄 Lined', grid:'⊞ Grid', dots:'· Dots', dots_lg:'·· Dots lg', ruled:'📓 Ruled', isometric:'◇ Isometric', dots_sq:'⊡ Dot grid' },
    themes:'Installed Themes', themesNone:'No themes found', themesCurrent:'Current:',
    openStyleSettings:'⚙ Open Style Settings',
    markers:'Highlights', markersAdd:'+ Add color', markersName:'Label (e.g. "Ideas")',
    markersApply:'Apply to selected', markersNone:'No markers yet.',
    images: '🖼 Images', imagesWidth: 'Max Width (%)', imagesFilter: 'Filter', imagesShadow: 'Add Shadow',
    tasks: '☑ Tasks', taskStyle: 'Checkmark Style', taskDim: 'Dim completed tasks',
    columns: '📰 Columns', colCount: 'Number of columns',
    reader: '📖 Reader', ruler: 'Reading Ruler', progress: 'Progress Bar',
    langSwitch:'UA', default:'default',
    settingsTitle:'Toolzer Settings',
    settingsTabsLabel:'Manage Tabs', settingsTabsDesc:'Choose visibility and reorder tabs (↑/↓)',
    settingsWidthLabel:'Popup width (px)', settingsWidthDesc:'Width of the tools popup panel',
    settingsResetLabel:'Reset all settings', settingsResetDesc:'Restore all settings to defaults',
    settingsResetBtn:'Reset everything',
    tabs:{ scroll:'swap_vert', width:'width_normal', font:'font_download', spacing:'format_line_spacing', size:'format_size', highlight:'ink_highlighter', markers:'location_on', headings:'format_h1', emoji:'mood', bullet:'format_list_bulleted', color:'colors', night:'dark_mode', paper:'description', themes:'palette', presets:'instant_mix', images:'image', tasks:'check_box', columns:'view_column', reader:'menu_book' },
    tabTitles:{ scroll:'Scroll', width:'Width', font:'Font', spacing:'Spacing', size:'Text Size', highlight:'Highlight', markers:'Markers', headings:'Headings', emoji:'Emoji', bullet:'Bullets', color:'Text Color', night:'Night', paper:'Paper', themes:'Themes', presets:'Presets', images:'Images', tasks:'Tasks', columns:'Columns', reader:'Reader' },
    tp_images: 'Adjust image sizes, add shadow or grayscale/invert filters',
    tp_tasks: 'Style your checklists and dim completed tasks',
    tp_columns: 'Split your long text into clean newspaper columns',
    tp_reader: 'Reading progress bar and cursor-following reading ruler',
    tp_scroll: 'Adjust smooth scrolling speed or disable it',
    tp_width: 'Constrain the text field width for comfortable reading',
    tp_font: 'Override standard code/reading fonts system-wide',
    tp_spacing: 'Adjust gaps between lines and paragraphs',
    tp_size: 'Increase or decrease general text size',
    tp_highlight: 'Change standard selection background color',
    tp_markers: 'Quickly change global selection color to preset markers and apply ==highlight==',
    tp_headings: 'Decorate H1-H6 separately (underlines, boxes, bg)',
    tp_emoji: 'Quick emoji picker to insert or copy',
    tp_bullet: 'Change default • dots in lists with cool symbols',
    tp_color: 'Override standard text color with custom tint',
    tp_night: 'Eye-care sepia overlay filter for the entire screen',
    tp_paper: 'Add note paper backgrounds (grids, dots, lines)',
    tp_themes: 'Quickly switch Obsidian themes',
    tp_presets: 'Save snapshots of your Toolzer setup for different moods'
  },
  ua: {
    scroll:'Швидкість скролінгу', scrollLeft:'🐢 плавно', scrollRight:'⚡ швидко',
    width:'Ширина сторінки', widthLeft:'📖 вузько', widthRight:'🖥 широко',
    bodyFont:'Шрифт тексту', uiFont:'Шрифт інтерфейсу', fontPreview:'Швидка лисиця — The quick brown fox',
    resetFonts:'↺ Скинути шрифти', fontDefault:'— За замовчуванням —',
    lineSpacing:'Міжрядковий інтервал', paraSpacing:'Відступ між абзацами', letterSpacing:'Відстань між літерами', resetSpacing:'↺ Скинути',
    highlight:'Колір виділення', neonPresets:'Неонові пресети', resetHighlight:'↺ Скинути на жовтий', highlightHint:'← Виділи цей текст щоб побачити колір',
    headings:'Оформлення заголовків', headingsDesc:'Стиль для кожного рівня', resetHeadings:'↺ Очистити все',
    emojiSearch:'🔍 Пошук (напр. fire, heart, star)', emojiHint:'Клік: вставити  |  Правий клік: скопіювати',
    presetSave:'Зберегти як пресет', presetName:'Назва пресету...', presetAdd:'+ Зберегти', presetList:'Збережені пресети', presetNone:'Пресетів ще немає.',
    sepia:'Сепія / Нічний режим', sepiaToggle:'Увімкнути сепія-фільтр', sepiaIntensity:'Інтенсивність',
    bullet:'Стиль маркерів', bulletCustom:'Свій символ або емоджі',
    textColor:'Колір тексту', textColorReset:'↺ Скинути колір тексту',
    typefaceSize:'Розмір тексту', typefaceSizeLeft:'малий', typefaceSizeRight:'великий',
    paper:'Текстура паперу', paperOpacity:'Прозорість', paperColor:'Колір ліній',
    paperPatterns:{ none:'Немає', lined:'📄 Лінійка', grid:'⊞ Клітинка', dots:'· Крапки', dots_lg:'·· Крапки lg', ruled:'📓 Зошит', isometric:'◇ Ізометрія', dots_sq:'⊡ Dot grid' },
    themes:'Встановлені теми', themesNone:'Теми не знайдено', themesCurrent:'Поточна:',
    openStyleSettings:'⚙ Відкрити Style Settings',
    markers:'Швидкі Маркери', markersAdd:'+ Додати колір', markersName:'Назва (напр. "Ідеї")',
    markersApply:'Застосувати до виділеного', markersNone:'Маркерів ще немає.',
    images: '🖼 Зображення', imagesWidth: 'Макс. ширина (%)', imagesFilter: 'Фільтр', imagesShadow: 'Додати тінь',
    tasks: '☑ Завдання', taskStyle: 'Стиль галочок', taskDim: 'Тьмяні виконані',
    columns: '📰 Колонки', colCount: 'Кількість колонок',
    reader: '📖 Читач', ruler: 'Лінійка для читання', progress: 'Бар прогресу',
    langSwitch:'EN', default:'за замовч.',
    settingsTitle:'Налаштування Toolzer',
    settingsTabsLabel:'Керування вкладками', settingsTabsDesc:'Видимість та сортування (↑/↓)',
    settingsWidthLabel:'Ширина попапу (px)', settingsWidthDesc:'Ширина панелі інструментів',
    settingsResetLabel:'Скинути всі налаштування', settingsResetDesc:'Відновити початкові налаштування',
    settingsResetBtn:'Скинути все',
    tabs:{ scroll:'swap_vert', width:'width_normal', font:'font_download', spacing:'format_line_spacing', size:'format_size', highlight:'ink_highlighter', markers:'location_on', headings:'format_h1', emoji:'mood', bullet:'format_list_bulleted', color:'colors', night:'dark_mode', paper:'description', themes:'palette', presets:'instant_mix', images:'image', tasks:'check_box', columns:'view_column', reader:'menu_book' },
    tabTitles:{ scroll:'Скролінг', width:'Ширина', font:'Шрифт', spacing:'Відступи', size:'Розмір', highlight:'Виділення', markers:'Маркери', headings:'Заголовки', emoji:'Емоджі', bullet:'Маркери', color:'Колір', night:'Ніч', paper:'Папір', themes:'Теми', presets:'Пресети', images:'Зображення', tasks:'Завдання', columns:'Колонки', reader:'Читач' },
    tp_images: 'Налаштування розміру, фільтрів та додавання тіней для всіх зображень',
    tp_tasks: 'Стилізація чек-листів та згасання виконаних завдань',
    tp_columns: 'Розбиття великих текстів на кілька газетних колонок',
    tp_reader: 'Індикатори читання: лінійка за курсором та прогрес-бар скролінгу',
    tp_scroll: 'Плавний скролінг миші. Можна повністю вимкнути.',
    tp_width: 'Обмеження ширини текстового поля для зручного читання',
    tp_font: 'Перевизначення системних шрифтів для тексту та інтерфейсу',
    tp_spacing: 'Коригування відступів між абзацами, рядками та літерами',
    tp_size: 'Збільшення масштабу тексту (на відміну від зуму Obsidian)',
    tp_highlight: 'Зміна кольору фону для стандартного виділення тексту',
    tp_markers: 'Створіть пресети кольорів та швидко обгортайте текст у марковані HTML-теги',
    tp_headings: 'Окреме оформлення H1-H6: рамки, лінії, фони',
    tp_emoji: 'Швидкий пошук та вставка емоджі у текст (чи копіювання)',
    tp_bullet: 'Зміна стандартних крапок списків • на цікаві символи',
    tp_color: 'Кастомне тонування загального кольору всього тексту',
    tp_night: 'Сепія-фільтр для очей або нічного читання на цілий екран',
    tp_paper: 'Паперові фони під текст: клітинка, крапка, ізометрія',
    tp_themes: 'Швидкий менеджер перемикання встановлених тем Obsidian',
    tp_presets: 'Збереження конфігурацій Toolzer під різний настрій'
  }
};

const ALL_TAB_IDS = ['scroll','width','font','spacing','size','highlight','markers','headings','emoji','bullet','color','images','tasks','columns','night','paper','reader','themes','presets'];

const EMOJI_GROUPS = [
  { label:'😀 Smileys', emojis:['😀','😁','😂','🤣','😃','😄','😅','😆','😉','😊','😋','😎','😍','🥰','😘','😗','😙','😚','🙂','🤗','🤩','🤔','🤨','😐','😑','😶','🙄','😏','😣','😥','😮','🤐','😯','😪','😫','🥱','😴','😌','😛','😜','😝','🤤','😒','😓','😔','😕','🙃','🤑','😲','☹️','🙁','😖','😞','😟','😤','😢','😭','😦','😧','😨','😩','🤯','😬','😰','😱','🥵','🥶','😳','🤪','😵','😡','😠','🤬','😷','🤒','🤕','🤢','🤮','🤧','😇','🥳','🥺','🤠','🤡','🤥','🤫','🤭','🧐','🤓','😈','👿','👹','👺','💀','☠️','👻','👽','👾','🤖'] },
  { label:'👋 Gestures', emojis:['👋','🤚','🖐','✋','🖖','👌','🤌','🤏','✌️','🤞','🤟','🤘','🤙','👈','👉','👆','🖕','👇','☝️','👍','👎','✊','👊','🤛','🤜','👏','🙌','🫶','👐','🤲','🤝','🙏','✍️','💅','🤳','💪','🦾','🦵','🦶','👂','🦻','👃','🫀','🫁','🧠','🦷','🦴','👀','👁','👅','👄','🫦'] },
  { label:'👶 People', emojis:['👶','🧒','👦','👧','🧑','👱','👨','🧔','👩','🧓','👴','👵','🙍','🙎','🙅','🙆','💁','🙋','🧏','🙇','🤦','🤷','👮','🕵️','💂','🥷','👷','🫅','🤴','👸','👳','👲','🧕','🤵','👰','🤰','🤱','👼','🎅','🤶','🧙','🧝','🧛','🧟','🧞','🧜','🧚','🧌','👤','👥','🫂'] },
  { label:'❤️ Hearts', emojis:['❤️','🧡','💛','💚','💙','💜','🖤','🤍','🤎','❤️‍🔥','❤️‍🩹','💔','❣️','💕','💞','💓','💗','💖','💘','💝','💟','☮️','✝️','☪️','🕉','☸️','✡️','🔯','🛐','⛎','♈','♉','♊','♋','♌','♍','♎','♏','♐','♑','♒','♓','🆔','⚛️'] },
  { label:'🐶 Animals', emojis:['🐶','🐱','🐭','🐹','🐰','🦊','🦝','🐻','🐼','🐻‍❄️','🐨','🐯','🦁','🐮','🐷','🐸','🐵','🙈','🙉','🙊','🐔','🐧','🐦','🐤','🦆','🦅','🦉','🦇','🐺','🐗','🐴','🦄','🐝','🐛','🦋','🐌','🐞','🐜','🦗','🦟','🦂','🐢','🐍','🦎','🦖','🦕','🐙','🦑','🦐','🦞','🦀','🐡','🐠','🐟','🐬','🐳','🐋','🦈','🐊','🐅','🐆','🦓','🦍','🦧','🦣','🐘','🦛','🦏','🐪','🐫','🦒','🦘','🦬','🐃','🐂','🐄','🐎','🐖','🐏','🐑','🦙','🐐','🦌','🐕','🐩','🦮','🐕‍🦺','🐈','🐈‍⬛','🐓','🦃','🦤','🦚','🦜','🦢','🦩','🕊','🐇','🦨','🦡','🦫','🦦','🦥','🐁','🐀','🐿','🦔'] },
  { label:'🌸 Plants', emojis:['🌸','🌺','🌻','🌹','🥀','🌷','🌱','🌲','🌳','🌴','🌵','🎋','🎍','🍀','🍁','🍂','🍃','🪴','🌾','💐','🪷','🪻','🌿','☘️','🪸','🍄','🌰'] },
  { label:'🍎 Food', emojis:['🍎','🍐','🍊','🍋','🍌','🍉','🍇','🍓','🫐','🍈','🍒','🍑','🥭','🍍','🥥','🥝','🍅','🫒','🥑','🍆','🥕','🌽','🌶','🫑','🥒','🥬','🧄','🧅','🥔','🍠','🥐','🥯','🍞','🥖','🧀','🥚','🍳','🧈','🥞','🧇','🥓','🥩','🍗','🍖','🌭','🍔','🍟','🍕','🫓','🥪','🥙','🧆','🌮','🌯','🫔','🥗','🥘','🫕','🍱','🍘','🍙','🍚','🍛','🍜','🍝','🍢','🍣','🍤','🍥','🥮','🍡','🥟','🦪','🍦','🍧','🍨','🍩','🍪','🎂','🍰','🧁','🥧','🍫','🍬','🍭','🍮','🍯','🍼','🥛','☕','🫖','🍵','🧃','🥤','🧋','🍶','🍺','🍻','🥂','🍷','🥃','🍸','🍹','🧉','🍾','🧊'] },
  { label:'⚽ Sports', emojis:['⚽','🏀','🏈','⚾','🥎','🎾','🏐','🏉','🥏','🎱','🪀','🏓','🏸','🏒','🏑','🥍','🏏','🪃','🥅','⛳','🪁','🎣','🤿','🎽','🎿','🛷','🥌','🎯','🏹','🥊','🥋','🎖','🏆','🥇','🥈','🥉','🏅','🎗','🎫','🎟','🎪','🤹','🎭','🩰','🎨','🎬','🎤','🎧','🎼','🎵','🎶','🎷','🎸','🎹','🎺','🎻','🥁','🪘','🎮','🕹','🎲','🧩'] },
  { label:'🚗 Vehicles', emojis:['🚗','🚕','🚙','🚌','🚎','🏎','🚓','🚑','🚒','🚐','🛻','🚚','🚛','🚜','🏍','🛵','🛺','🚲','🛴','🛹','🛼','⛽','🚧','⚓','🛟','⛵','🚤','🛥','🛳','⛴','🚢','✈️','🛩','🛫','🛬','🪂','💺','🚁','🚟','🚠','🚡','🛰','🚀','🛸','🪐'] },
  { label:'🏠 Places', emojis:['🏠','🏡','🏢','🏣','🏤','🏥','🏦','🏨','🏩','🏪','🏫','🏭','🏯','🏰','💒','🗼','🗽','⛪','🕌','🛕','🕍','⛩','🕋','⛲','⛺','🌁','🌃','🏙','🌄','🌅','🌆','🌇','🌉','🏔','⛰','🌋','🗻','🏕','🏖','🏜','🏝','🏞','🧱','🪨','🪵','🛖'] },
  { label:'💡 Objects', emojis:['💡','🔦','🕯','🪔','🧨','✨','🎆','🎇','🎃','🎄','🎋','🎍','🎎','🎏','🎐','🧧','🎀','🎁','🎗','🎟','🎫','🏮','🪄','🎭','🎨','🖼','🎪','🎠','🎡','🎢','💈','🎰'] },
  { label:'📱 Tech', emojis:['📱','💻','🖥','🖨','⌨️','🖱','🖲','💽','💾','💿','📀','📺','📷','📸','📹','🎥','📽','🎞','📞','☎️','📟','📠','📡','🔋','🔌','💡','🔦','🕯','🧯','🛢','💰','💳','💸','💹','🔐','🔑','🗝','🔒','🔓','🔨','🪓','⛏','⚒','🛠','⚔️','🛡','🪚','🔧','🪛','🔩','⚙️','🗜','⚖️','🪤','🧲','🔗','⛓','🪝','🧰','🪜'] },
  { label:'📚 Office', emojis:['📚','📖','📝','✏️','🖊','🖋','📓','📔','📒','📕','📗','📘','📙','📃','📄','📑','🗒','📊','📈','📉','🗂','🗃','🗄','🗑','📥','📤','📦','📧','📨','📩','📪','📫','📬','📭','📮','🗳','✂️','🖇','📎','📏','📐','🗺','📌','📍','🔍','🔎','🔏','🔐','🔒','🔓'] },
  { label:'💎 Symbols', emojis:['💎','🔮','🪄','🧿','🪬','🏺','🗿','🧭','⏰','⌚','⏱','⏲','🕰','⌛','⏳','📡','🔭','🔬','⚗️','🧫','🧪','🧬','🩺','🩻','🩹','💊','💉','🩸','🩼','🧸','🪆','🪅','🎎','🎏','🎐','🧧','🎀','🎁'] },
  { label:'🌙 Sky', emojis:['🌙','☀️','🌤','⛅','🌥','☁️','🌦','🌧','⛈','🌩','🌨','❄️','☃️','⛄','🌬','💨','🌀','🌈','🌂','☂️','☔','⚡','🌪','🌫','🌊','🌋','⭐','🌟','💫','✨','🌠','🌌','🌑','🌒','🌓','🌔','🌕','🌖','🌗','🌘','🌙','🌚','🌛','🌜','🌝','🌞','🪐','💥','🌍','🌎','🌏','🌐','🗺'] },
  { label:'✍️ Writing', emojis:['✍️','📝','✏️','🖊','🖋','📖','📚','📓','📔','📒','📕','📗','📘','📙','📃','📄','📋','📌','📍','✂️','📎','📬','📧','💬','💭','🗨','🗯','✉️','📦','🗒','📊','📈','📉','🗓','📅','📆','🗑'] },
  { label:'🎭 Arts', emojis:['🎭','🎨','🖼','🎬','🎤','🎧','🎼','🎵','🎶','🎷','🎸','🎹','🎺','🎻','🥁','🪘','🎙','📻','📺','🎞','📽','🎥','📷','📸','🎠','🎡','🎢','🎪','🎟','🎫','🎗','🏆','🥇','🥈','🥉','🏅','🎖','🎀','🎁','🎊','🎉','🎈','🎏','🎐'] },
  { label:'🧘 Wellness', emojis:['🧘','🏃','🚶','🧗','🏋','🤸','🤼','🤺','🤾','🏌','🏇','🧖','⛷','🏂','🏄','🚣','💆','💇','🛀','🛌','💃','🕺','👯','🧑‍🤝‍🧑','👫','👬','👭','💑','👨‍👩‍👦','👨‍👩‍👧','🏠','🏡'] },
  { label:'🔢 Numbers', emojis:['0️⃣','1️⃣','2️⃣','3️⃣','4️⃣','5️⃣','6️⃣','7️⃣','8️⃣','9️⃣','🔟','💯','🔢','🔡','🔠','🆎','🆑','🆒','🆓','🆔','🆕','🆖','🆗','🆘','🆙','🆚','▶️','⏸','⏹','⏺','⏭','⏮','⏩','⏪','🔀','🔁','🔂','🔼','🔽','⏫','⏬','⬅️','➡️','⬆️','⬇️','↗️','↘️','↙️','↖️','↕️','↔️','🔄'] },
  { label:'🏳 Flags', emojis:['🏳️','🏴','🏁','🚩','🏳️‍🌈','🏳️‍⚧️','🏴‍☠️','🇺🇦','🇺🇸','🇬🇧','🇩🇪','🇫🇷','🇮🇹','🇪🇸','🇵🇱','🇸🇰','🇨🇿','🇷🇴','🇭🇺','🇧🇬','🇭🇷','🇷🇸','🇸🇮','🇧🇦','🇲🇰','🇦🇱','🇬🇷','🇯🇵','🇨🇳','🇰🇷','🇮🇳','🇧🇷','🇨🇦','🇦🇺','🇳🇿','🇲🇽','🇦🇷','🇿🇦','🇳🇬','🇪🇬','🇹🇷','🇸🇦','🇦🇪','🇮🇱','🇮🇷','🇵🇰','🇧🇩','🇹🇭','🇻🇳','🇵🇭','🇮🇩','🇲🇾','🇸🇬','🇳🇴','🇸🇪','🇫🇮','🇩🇰','🇮🇸','🇮🇪','🇵🇹','🇳🇱','🇧🇪','🇨🇭','🇦🇹','🇱🇺'] },
];
const EM_KEYWORDS = { 'fire':'🔥', 'heart':'❤️', 'star':'⭐', 'check':'✅', 'idea':'💡', 'sad':'😢', 'happy':'😀' };

const HEADING_STYLES = [
  { value:'none', label:'✕  None' },
  { value:'underline-solid', label:'—  Solid underline' },
  { value:'underline-dashed', label:'╌  Dashed underline' },
  { value:'underline-dotted', label:'···  Dotted underline' },
  { value:'underline-wavy', label:'〰  Wavy underline' },
  { value:'overline', label:'‾  Overline' },
  { value:'strike', label:'S̶  Strikethrough' },
  { value:'box', label:'□  Box border' },
  { value:'bg-accent', label:'█  Accent background' },
  { value:'bg-dim', label:'▒  Dim background' },
];

const BULLET_PRESETS = [
  { label:'● Circle',  value:'●' },
  { label:'▪ Square',  value:'▪' },
  { label:'★ Star',    value:'★' },
  { label:'→ Arrow',   value:'→' },
  { label:'◆ Diamond', value:'◆' },
  { label:'– Dash',    value:'–' },
  { label:'• Default', value:'' },
];

const NEON_PRESETS = [
  { label:'🩷 Pink',   color:'#ff2d78' },
  { label:'🩵 Cyan',   color:'#00f5ff' },
  { label:'💜 Purple', color:'#b94fff' },
  { label:'💚 Green',  color:'#39ff14' },
  { label:'🟠 Amber',  color:'#ff9f00' },
  { label:'⚪ White',  color:'#ffffff' },
  { label:'🟡 Yellow', color:'#ffff00' },
];

function paperBg(pattern, color, opacity) {
  const a = Math.round(opacity * 2.55).toString(16).padStart(2,'0');
  const c = color + a;
  switch(pattern) {
    case 'lined': return { bg:`repeating-linear-gradient(transparent,transparent 27px,${c} 27px,${c} 28px)`, size:'100% 28px' };
    case 'grid': return { bg:`repeating-linear-gradient(${c} 0,${c} 1px,transparent 1px,transparent 28px),repeating-linear-gradient(90deg,${c} 0,${c} 1px,transparent 1px,transparent 28px)`, size:'28px 28px' };
    case 'dots': return { bg:`radial-gradient(circle,${c} 1px,transparent 1px)`, size:'20px 20px' };
    case 'dots_lg': return { bg:`radial-gradient(circle,${c} 1.5px,transparent 1.5px)`, size:'32px 32px' };
    case 'ruled': return { bg:`repeating-linear-gradient(transparent,transparent 27px,${color}${a} 27px,${color}${a} 28px),linear-gradient(90deg,transparent 39px,#ff444433 39px,#ff444433 41px,transparent 41px)`, size:'100% 28px' };
    case 'isometric': return { bg:`radial-gradient(circle,${c} 1px,transparent 1px),radial-gradient(circle,${c} 1px,transparent 1px)`, size:'20px 34.6px,20px 34.6px' };
    case 'dots_sq': return { bg:`radial-gradient(circle,${c} 1px,transparent 1px)`, size:'14px 14px' };
    default: return null;
  }
}

const DEFAULTS = {
  lang:'en',
  scrollEnabled:true, scrollSpeed:18,
  pageWidth:1250, popupWidth:620,
  bodyFont:'', uiFont:'',
  lineSpacing:1.5, paragraphSpacing:1.0, letterSpacing:0,
  typefaceSize:16,
  highlightColor:'#ffff00',
  h1Style:'underline-dotted', h2Style:'none', h3Style:'underline-wavy', h4Style:'underline-dotted', h5Style:'none', h6Style:'none',
  bulletStyle:'', bulletCustom:'', textColor:'',
  sepiaEnabled:false, sepiaIntensity:40, popupOpacity:100,
  paperPattern:'none', paperOpacity:15, paperColor:'#888888',
  markers:[], visibleTabs:ALL_TAB_IDS, tabOrder:ALL_TAB_IDS, presets:[], activeTab:'scroll',
  imageMaxWidth: 100, imageFilter: 'none', imageShadow: false,
  taskStyle: 'default', taskDim: false, columnsCount: 1, rulerEnabled: false, progressEnabled: false
};

function cloneDefaults() {
  return JSON.parse(JSON.stringify(DEFAULTS));
}

function normalizeSettings(raw) {
  const settings = Object.assign(cloneDefaults(), raw || {});
  settings.visibleTabs = Array.isArray(settings.visibleTabs) ? [...settings.visibleTabs] : [...ALL_TAB_IDS];
  settings.tabOrder = Array.isArray(settings.tabOrder) ? [...settings.tabOrder] : [...ALL_TAB_IDS];
  settings.presets = Array.isArray(settings.presets) ? settings.presets.map(p => ({...p})) : [];
  settings.markers = Array.isArray(settings.markers) ? settings.markers.map(m => ({...m})) : [];
  if (!ALL_TAB_IDS.includes(settings.activeTab)) settings.activeTab = DEFAULTS.activeTab;
  if (settings.taskStyle === 'cross') settings.taskStyle = 'default';
  if (!['default','round','filled'].includes(settings.taskStyle)) settings.taskStyle = 'default';
  if (!['none','grayscale','invert'].includes(settings.imageFilter)) settings.imageFilter = 'none';
  if (!['none','lined','grid','dots','dots_lg','ruled','isometric','dots_sq'].includes(settings.paperPattern)) settings.paperPattern = 'none';
  settings.visibleTabs = settings.visibleTabs.filter(id => ALL_TAB_IDS.includes(id));
  settings.tabOrder = settings.tabOrder.filter(id => ALL_TAB_IDS.includes(id));
  ALL_TAB_IDS.forEach(id => {
    if (!settings.tabOrder.includes(id)) settings.tabOrder.push(id);
    if (DEFAULTS.visibleTabs.includes(id) && !settings.visibleTabs.includes(id) && raw?.visibleTabs == null) settings.visibleTabs.push(id);
  });
  return settings;
}

function cssContentString(value) {
  return String(value ?? '')
    .replace(/\\/g, '\\\\')
    .replace(/"/g, '\\"')
    .replace(/\r/g, '\\A ')
    .replace(/\n/g, '\\A ');
}

function injectStyle(id, css) { let el = document.getElementById(id); if (!el) { el = document.createElement('style'); el.id = id; document.head.appendChild(el); } el.textContent = css; }
function removeStyle(id) { const el = document.getElementById(id); if (el) el.remove(); }
function luma(hex) { const r=parseInt(hex.slice(1,3),16),g=parseInt(hex.slice(3,5),16),b=parseInt(hex.slice(5,7),16); return (0.299*r+0.587*g+0.114*b)/255; }
function contrastText(hex) { return luma(hex) > 0.5 ? '#000000' : '#ffffff'; }

class ToolzerPlugin extends Plugin {
  async onload() {
    await this.loadSettings();
    this.scrollHandlers = new Map();
    this.applyAll();
    this.statusBarEl = this.addStatusBarItem();
    this.statusBarEl.setText('⚙ toolzer');
    this.statusBarEl.style.cursor = 'pointer';
    this.statusBarEl.title = 'Toolzer';
    this.registerDomEvent(this.statusBarEl, 'click', () => this.togglePopup());
    this.addCommand({ id: 'open-toolkit', name: 'Open toolkit', callback: () => this.togglePopup() });
    this.addSettingTab(new ToolzerSettingTab(this.app, this));
    this.registerEvent(this.app.workspace.on('layout-change', () => this.attachScrollHandlers()));
    this.attachScrollHandlers();
  }

  onunload() {
    this.closePopup();
    this.detachScrollHandlers();
    ['width','font','spacing','typesize','highlight','headings','bullet','textcolor','sepia','paper','markers','images','tasks','columns','popup-shell'].forEach(id=>removeStyle('tz-'+id));
    if(this.rulerEl) { this.rulerEl.remove(); this.rulerEl=null; }
    if(this._rulerMove) { document.removeEventListener('mousemove', this._rulerMove); this._rulerMove=null; }
    if(this.progEl) { this.progEl.remove(); this.progEl=null; }
  }

  get t() { return I18N[this.settings.lang || 'en']; }

  applyAll() {
    this.applyWidth(); this.applyFont(); this.applySpacing(); this.applyTypefaceSize();
    this.applyHighlight(); this.applyHeadings(); this.applyBullet(); this.applyTextColor(); 
    this.applySepia(); this.applyPaper(); this.applyMarkers(); 
    this.applyImages(); this.applyTasks(); this.applyColumns(); this.applyReader();
  }

  applyWidth() { const w=this.settings.pageWidth; injectStyle('tz-width', `:root{--file-line-width:${w}px !important;--max-width:${w}px !important;--line-width:${w}px !important;} .markdown-source-view.mod-cm6 .cm-contentContainer, .markdown-source-view.mod-cm6 .cm-content, .markdown-preview-view .markdown-preview-section, .markdown-reading-view .markdown-rendered{max-width:${w}px !important;}`); }
  applyFont() { let css=''; const b=this.settings.bodyFont, u=this.settings.uiFont; if(b) css+=`body,.cm-content,.markdown-rendered,.cm-line{font-family:"${b}",monospace !important;}\n`; if(u) css+=`.workspace-leaf-content,.nav-file-title,.titlebar,.status-bar,.workspace-tab-header,.modal,.menu{font-family:"${u}",monospace !important;}\n`; injectStyle('tz-font', css); }
  applySpacing() { const {lineSpacing:ls,paragraphSpacing:ps,letterSpacing:lt}=this.settings; injectStyle('tz-spacing', `.cm-content,.cm-content .cm-line{line-height:${ls} !important;letter-spacing:${lt}em !important;} .markdown-rendered p,.markdown-rendered li,.markdown-rendered blockquote{line-height:${ls} !important;letter-spacing:${lt}em !important;} .markdown-rendered p{margin-bottom:${ps}em !important;}`); }
  applyTypefaceSize() { const s=this.settings.typefaceSize; if(!s||s===16){removeStyle('tz-typesize');return;} injectStyle('tz-typesize',`.cm-content,.cm-line,.markdown-rendered{font-size:${s}px !important;}`); }
  applyHighlight() { const c=this.settings.highlightColor; const text=contrastText(c); injectStyle('tz-highlight', `.markdown-rendered ::selection,.cm-content ::selection,::selection{background-color:${c} !important;color:${text} !important;} .cm-focused .cm-selectionBackground,.cm-selectionBackground{background-color:${c}bb !important;} .cm-focused>.cm-scroller>.cm-content .cm-selectionBackground{background-color:${c}bb !important;}`); }
  
  applyHeadings() {
    let css='';
    for(let i=1;i<=6;i++){
      const style=this.settings[`h${i}Style`]||'none'; if(style==='none') continue;
      const sel=`body .markdown-rendered h${i},body .markdown-source-view.mod-cm6 .cm-header-${i}`;
      const map={
        'underline-solid': `${sel}{border-bottom:2px solid var(--interactive-accent)!important;padding-bottom:4px!important}`,
        'underline-dashed':`${sel}{border-bottom:2px dashed var(--interactive-accent)!important;padding-bottom:4px!important}`,
        'underline-dotted':`${sel}{border-bottom:2px dotted var(--interactive-accent)!important;padding-bottom:4px!important}`,
        'underline-wavy':  `${sel}{text-decoration:underline wavy var(--interactive-accent)!important;text-underline-offset:4px!important}`,
        'overline':        `${sel}{border-top:2px solid var(--interactive-accent)!important;padding-top:4px!important}`,
        'strike':          `${sel}{text-decoration:line-through var(--interactive-accent)!important}`,
        'box':             `${sel}{border:2px solid var(--interactive-accent)!important;padding:4px 8px!important}`,
        'bg-accent':       `${sel}{background:var(--interactive-accent)!important;color:var(--background-primary)!important;padding:2px 8px!important}`,
        'bg-dim':          `${sel}{background:var(--background-modifier-border)!important;padding:2px 8px!important}`,
      };
      if(map[style]) css+=map[style]+'\n';
    }
    injectStyle('tz-headings',css);
  }

  applyBullet() {
    const sym=this.settings.bulletCustom||this.settings.bulletStyle;
    if(!sym){removeStyle('tz-bullet');return;}
    const cssSym=cssContentString(sym);
    injectStyle('tz-bullet', `body .markdown-rendered .list-bullet, body .cm-s-obsidian span.list-bullet { font-size:0 !important; } body .markdown-rendered .list-bullet::before, body .cm-s-obsidian span.list-bullet::before, body .markdown-source-view .list-bullet::before { content:"${cssSym}" !important; font-size:1rem !important; color:var(--interactive-accent) !important; display:inline !important; visibility:visible !important; } body .markdown-rendered .list-bullet::after, body .cm-s-obsidian span.list-bullet::after, body .markdown-source-view .list-bullet::after { content:"" !important; display:none !important; } body .markdown-rendered ul>li::marker, body .markdown-preview-view ul>li::marker { content:"${cssSym} " !important; color:var(--interactive-accent) !important; }`);
  }
  applyTextColor() { const c=this.settings.textColor; if(!c){removeStyle('tz-textcolor');return;} injectStyle('tz-textcolor',`.cm-content,.cm-line,.markdown-rendered p,.markdown-rendered li{color:${c}!important}`); }
  applySepia() { if(!this.settings.sepiaEnabled){removeStyle('tz-sepia');return;} injectStyle('tz-sepia',`.workspace{filter:sepia(${this.settings.sepiaIntensity/100})!important}`); }
  
  applyPaper() { const {paperPattern:p,paperOpacity:op,paperColor:col}=this.settings; if(!p||p==='none'){removeStyle('tz-paper');return;} const result=paperBg(p,col,op); if(!result) return; injectStyle('tz-paper', `.cm-content{background-image:${result.bg}!important;background-size:${result.size}!important;background-attachment:local!important;} .markdown-reading-view .markdown-rendered{background-image:${result.bg}!important;background-size:${result.size}!important;}`); }
  applyMarkers() { if(!this.settings.markers){removeStyle('tz-markers');return;} let css=''; this.settings.markers.forEach(m=>{ css+=`.tz-mark-${m.id}{background-color:${m.color}!important;color:${contrastText(m.color)}!important;border-radius:2px;padding:0 2px;}\n`;}); injectStyle('tz-markers',css); }
  applyImages() {
    const {imageMaxWidth, imageFilter, imageShadow} = this.settings;
    if(imageMaxWidth === 100 && imageFilter === 'none' && !imageShadow) { removeStyle('tz-images'); return; }
    let filt = 'none';
    if(imageFilter === 'grayscale') filt = 'grayscale(100%)';
    if(imageFilter === 'invert') filt = 'invert(100%) hue-rotate(180deg)';
    injectStyle('tz-images', `
      .markdown-rendered img {
        max-width: ${imageMaxWidth}% !important;
        filter: ${filt} !important;
        box-shadow: ${imageShadow ? '0 4px 12px rgba(0,0,0,0.3)' : 'none'} !important;
        transition: filter 0.3s ease;
      }
    `);
  }

  applyTasks() {
    const {taskStyle, taskDim} = this.settings;
    if(taskStyle === 'default' && !taskDim) { removeStyle('tz-tasks'); return; }
    let css = '';
    if(taskDim) css += `
.markdown-rendered .task-list-item.is-checked { opacity: 0.4 !important; transition: opacity 0.2s; }
.markdown-source-view.mod-cm6 .HyperMD-task-line[data-task]:not([data-task=" "]) { opacity: 0.4 !important; transition: opacity 0.2s; }
`;
    if(taskStyle === 'round') css += `
.markdown-rendered .task-list-item input[type=checkbox],
.markdown-source-view.mod-cm6 input[type=checkbox] { border-radius: 50% !important; }
`;
    if(taskStyle === 'filled') css += `
.markdown-rendered .task-list-item input[type=checkbox]:checked,
.markdown-source-view.mod-cm6 input[type=checkbox]:checked { background-color: var(--interactive-accent) !important; border-color: var(--interactive-accent) !important; }
`;
    injectStyle('tz-tasks', css);
  }

  applyColumns() {
    const c = this.settings.columnsCount;
    if (c > 1) {
      injectStyle('tz-columns', `
        .markdown-reading-view .markdown-preview-section { column-count: ${c} !important; column-gap: 2.5em !important; }
        .markdown-reading-view .markdown-preview-section > div, .markdown-reading-view .markdown-preview-section > p, .markdown-reading-view .markdown-preview-section > h1, .markdown-reading-view .markdown-preview-section > h2, .markdown-reading-view .markdown-preview-section > h3 { break-inside: avoid; }
      `);
    } else {
      removeStyle('tz-columns');
    }
  }

  applyReader() {
    if(this.settings.rulerEnabled) {
      if(!this.rulerEl) { 
        this.rulerEl = document.createElement('div');
        this.rulerEl.className = 'tz-ruler';
        Object.assign(this.rulerEl.style, { position: 'fixed', left: 0, width: '100vw', height: '32px', background: 'var(--interactive-accent)', opacity: '0.15', pointerEvents: 'none', zIndex: 9998, display: 'none' });
        document.body.appendChild(this.rulerEl);
        this._rulerMove = (e) => { 
            if(this.rulerEl) { this.rulerEl.style.display='block'; this.rulerEl.style.top = (e.clientY - 16) + 'px'; }
        };
        document.addEventListener('mousemove', this._rulerMove);
      }
    } else {
      if(this.rulerEl) { this.rulerEl.remove(); this.rulerEl = null; }
      if(this._rulerMove) { document.removeEventListener('mousemove', this._rulerMove); this._rulerMove = null; }
    }

    if(this.settings.progressEnabled) {
      if(!this.progEl) {
        this.progEl = document.createElement('div');
        this.progEl.className = 'tz-prog';
        Object.assign(this.progEl.style, { position: 'fixed', top: 0, left: 0, height: '3px', background: 'var(--interactive-accent)', zIndex: 9999, width: '0%', pointerEvents:'none', transition:'width 0.1s linear'});
        document.body.appendChild(this.progEl);
      }
    } else {
      if(this.progEl) { this.progEl.remove(); this.progEl = null; }
    }
  }

  attachScrollHandlers() {
    ['.cm-scroller','.markdown-reading-view','.nav-files-container','.tag-container'].forEach(sel=>{
      document.querySelectorAll(sel).forEach(el=>{
        if(!this.scrollHandlers.has(el)){
          const h=this.makeScrollHandler(el);
          el.addEventListener('wheel',h,{passive:false});
          this.scrollHandlers.set(el,h);
        }
      });
    });
  }
  detachScrollHandlers(){this.scrollHandlers.forEach((h,el)=>el.removeEventListener('wheel',h,{passive:false}));this.scrollHandlers.clear();}
  reattachScrollHandlers(){this.detachScrollHandlers();this.attachScrollHandlers();}

  makeScrollHandler(el){
    let cur=0,target=0,raf=null;
    const animate=()=>{
      const speed=this.settings.scrollSpeed/100;
      cur+=(target-cur)*speed;
      if(Math.abs(target-cur)<0.5){el.scrollTop=target;raf=null;}else{el.scrollTop=cur;raf=requestAnimationFrame(animate);}
      if(this.settings.progressEnabled && this.progEl && (el.classList.contains('cm-scroller')||el.classList.contains('markdown-reading-view'))) {
        let p = (el.scrollTop / (el.scrollHeight - el.clientHeight)) * 100;
        this.progEl.style.width = Math.min(100, Math.max(0, p)) + '%';
      }
    };
    return(e)=>{
      if(!this.settings.scrollEnabled && (!this.settings.progressEnabled)) return;
      if(this.settings.scrollEnabled) {
        if(e.ctrlKey)return;
        e.preventDefault();
        if(!raf){cur=el.scrollTop;target=el.scrollTop;}
        let d=e.deltaY;if(e.deltaMode===1)d*=32;if(e.deltaMode===2)d*=el.clientHeight;
        target=Math.max(0,Math.min(el.scrollHeight-el.clientHeight,target+d));
        if(!raf)raf=requestAnimationFrame(animate);
      } else if (this.settings.progressEnabled) {
        if(this.progEl && (el.classList.contains('cm-scroller')||el.classList.contains('markdown-reading-view'))) {
            let p = (el.scrollTop / (el.scrollHeight - el.clientHeight)) * 100;
            this.progEl.style.width = Math.min(100, Math.max(0, p)) + '%';
        }
      }
    };
  }

  getAvailableFonts(){const d=new Set();try{if(document.fonts&&document.fonts.forEach)document.fonts.forEach(f=>d.add(f.family.replace(/['"]/g,'').trim()));}catch(e){}['Space Mono','Azeret Mono','iA Writer Quattro S','iA Writer Duo S','iA Writer Mono S','Noto Sans Mono'].forEach(f=>d.add(f));return[...d].sort();}
  getInstalledThemes(){try{const t=this.app.customCss?.themes||[];return Array.isArray(t)?t:Object.keys(t);}catch(e){return[];}}
  getCurrentTheme(){try{return this.app.customCss?.theme||'';}catch(e){return '';}}
  setTheme(name){try{this.app.customCss.setTheme(name);new Notice('Theme: '+(name||'Default'));}catch(e){new Notice('Could not switch theme');}}
  hasStyleSettings(){return!!this.app.plugins.plugins['obsidian-style-settings'];}
  getVisibleTabs(){const order=this.settings.tabOrder||ALL_TAB_IDS;const visible=this.settings.visibleTabs||ALL_TAB_IDS;return order.filter(id=>visible.includes(id));}
  openSettings(){this.app.setting.open();this.app.setting.openTabById('toolzer');}

  closePopup(){
    clearTimeout(this.popupClickTimer);
    if(this.popupOutsideClick) document.removeEventListener('click',this.popupOutsideClick);
    this.popupOutsideClick=null;
    document.getElementById('tz-popup')?.remove();
  }
  togglePopup(){if(document.getElementById('tz-popup')){this.closePopup();return;}this.openPopup();}

  openPopup(){
    const rect=this.statusBarEl.getBoundingClientRect();
    const popup=document.createElement('div');
    popup.id='tz-popup';
    const pw=this.settings.popupWidth||DEFAULTS.popupWidth;
    injectStyle('tz-popup-shell', `
      #tz-popup, #tz-popup * { box-sizing:border-box; }
      #tz-popup{
        --tz-surface:#111317;
        --tz-surface-low:#1a1c20;
        --tz-surface-high:#282a2e;
        --tz-surface-highest:#333539;
        --tz-outline:rgba(68,70,85,.2);
        --tz-primary:#bdc2ff;
        --tz-primary-strong:#4a5dfc;
        --tz-tertiary:#d3bbff;
        --tz-text:#e2e2e8;
        --tz-muted:#a2a4b1;
        --tz-faint:#737786;
      }
      #tz-popup input[type="range"]{
        accent-color:var(--tz-primary);
      }
      #tz-popup input[type="text"], #tz-popup select{
        outline:none;
      }
      #tz-popup button{
        transition:background-color .12s ease,color .12s ease,border-color .12s ease,opacity .12s ease,transform .12s ease;
      }
      #tz-popup .tz-scroll::-webkit-scrollbar{width:6px;height:6px;}
      #tz-popup .tz-scroll::-webkit-scrollbar-track{background:transparent;}
      #tz-popup .tz-scroll::-webkit-scrollbar-thumb{background:rgba(68,70,85,.85);}
      #tz-popup .tz-shell-title{
        font-family:"Inter","Segoe UI",sans-serif;
        font-weight:800;
        letter-spacing:.08em;
        color:var(--tz-primary);
      }
      #tz-popup .tz-icon{
        font-family:"Material Symbols Outlined";
        font-weight:400;
        font-style:normal;
        font-size:20px;
        line-height:1;
        letter-spacing:normal;
        text-transform:none;
        display:inline-block;
        white-space:nowrap;
        word-wrap:normal;
        direction:ltr;
        -webkit-font-smoothing:antialiased;
        font-variation-settings:'FILL' 0,'wght' 300,'GRAD' 0,'opsz' 24;
      }
      #tz-popup .tz-label{
        font-family:"Space Grotesk","Azeret Mono","Noto Sans Mono",monospace;
        text-transform:uppercase;
        letter-spacing:.08em;
      }
      #tz-popup .tz-module{
        background:var(--tz-surface-high);
        border:1px solid rgba(68,70,85,.12);
        padding:12px;
        margin-bottom:12px;
      }
      #tz-popup .tz-module-title{
        font-family:"Space Grotesk","Azeret Mono","Noto Sans Mono",monospace;
        text-transform:uppercase;
        letter-spacing:.12em;
        font-size:10px;
        color:var(--tz-primary);
        margin-bottom:10px;
      }
      #tz-popup .tz-value{
        font-family:"Space Grotesk","Azeret Mono","Noto Sans Mono",monospace;
        color:var(--tz-primary);
        font-weight:700;
        letter-spacing:.08em;
      }
    `);
    Object.assign(popup.style,{
      position:'fixed',bottom:'40px',right:(window.innerWidth-rect.right)+'px',
      background:'var(--tz-surface)',
      border:'1px solid var(--tz-outline)',
      zIndex:'9999',width:pw+'px',height:'520px',
      boxShadow:'0 12px 40px rgba(0,0,0,0.4)',
      display:'flex',flexDirection:'column',
      fontFamily:'Inter,"Segoe UI",sans-serif',
      opacity:(this.settings.popupOpacity/100).toString(),
      borderRadius:'8px',overflow:'hidden',
      color:'var(--tz-text)',
      backdropFilter:'blur(12px)'
    });
    const t=this.t;

    // Header
    const header=popup.createEl('div');
    Object.assign(header.style,{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'10px 12px',flexShrink:'0',background:'var(--tz-surface)',borderBottom:'1px solid var(--tz-outline)'});
    const hLeft=header.createEl('div');
    Object.assign(hLeft.style,{display:'flex',alignItems:'center',gap:'7px'});
    const title=hLeft.createEl('span',{text:'TOOLZER'});
    title.className='tz-shell-title';
    title.style.fontSize='12px';
    const langBtn=hLeft.createEl('button',{text:t.langSwitch});
    Object.assign(langBtn.style,{padding:'2px 8px',fontSize:'10px',cursor:'pointer',border:'1px solid rgba(68,70,85,.35)',background:'var(--tz-surface-high)',color:'var(--tz-primary)',borderRadius:'2px',fontFamily:'"Space Grotesk","Azeret Mono","Noto Sans Mono",monospace',letterSpacing:'0.06em'});
    langBtn.onclick=async()=>{this.settings.lang=this.settings.lang==='en'?'ua':'en';await this.saveSettings();popup.remove();this.openPopup();};
    const version=hLeft.createEl('span',{text:'v'+this.manifest.version});
    Object.assign(version.style,{fontSize:'9px',color:'var(--tz-faint)',padding:'1px 5px',border:'1px solid rgba(68,70,85,.35)',fontFamily:'"Space Grotesk","Azeret Mono","Noto Sans Mono",monospace',textTransform:'uppercase',letterSpacing:'0.08em'});
    const hRight=header.createEl('div');
    Object.assign(hRight.style,{display:'flex',alignItems:'center',gap:'6px'});
    hRight.createEl('span',{text:'opacity'}).style.cssText='font-size:9px;color:var(--tz-faint);text-transform:uppercase;letter-spacing:.08em;font-family:"Space Grotesk","Azeret Mono","Noto Sans Mono",monospace;';
    const opSlider=hRight.createEl('input');
    opSlider.type='range';opSlider.min='20';opSlider.max='100';opSlider.step='5';opSlider.value=String(this.settings.popupOpacity);
    Object.assign(opSlider.style,{width:'64px',cursor:'pointer'});
    opSlider.oninput=async()=>{this.settings.popupOpacity=parseInt(opSlider.value);popup.style.opacity=(this.settings.popupOpacity/100).toString();await this.saveSettings();};
    const settingsBtn=hRight.createEl('button',{text:'⚙'});
    settingsBtn.title='Plugin settings';
    Object.assign(settingsBtn.style,{padding:'3px 7px',fontSize:'12px',cursor:'pointer',border:'1px solid rgba(68,70,85,.35)',background:'var(--tz-surface-high)',color:'var(--tz-muted)',borderRadius:'2px'});
    settingsBtn.onclick=()=>{popup.remove();this.openSettings();};

    // Body = sidebar + content
    const body=popup.createEl('div');
    Object.assign(body.style,{display:'flex',flex:'1',overflow:'hidden',minHeight:'0'});
    const sidebar=body.createEl('div');
    Object.assign(sidebar.style,{width:'92px',flexShrink:'0',background:'var(--tz-surface-low)',borderRight:'1px solid var(--tz-outline)',overflowY:'auto',padding:'4px 0',display:'flex',flexDirection:'column'});
    sidebar.className='tz-scroll';
    const content=body.createEl('div');
    Object.assign(content.style,{flex:'1',overflowY:'auto',padding:'14px 16px',background:'var(--tz-surface)'});
    content.className='tz-scroll';

    const isTabActive=(id)=>{
      const s=this.settings;
      switch(id){
        case 'night': return s.sepiaEnabled;
        case 'paper': return s.paperPattern!=='none';
        case 'images': return s.imageMaxWidth!==100||s.imageFilter!=='none'||s.imageShadow;
        case 'tasks': return s.taskStyle!=='default'||s.taskDim;
        case 'reader': return s.rulerEnabled||s.progressEnabled;
        case 'spacing': return s.lineSpacing!==1.5||s.paragraphSpacing!==1.0||s.letterSpacing!==0;
        case 'font': return !!(s.bodyFont||s.uiFont);
        case 'headings': return s.h1Style!=='none'||s.h2Style!=='none'||s.h3Style!=='none'||s.h4Style!=='none'||s.h5Style!=='none'||s.h6Style!=='none';
        case 'bullet': return !!(s.bulletStyle||s.bulletCustom);
        case 'color': return !!s.textColor;
        case 'scroll': return !s.scrollEnabled||s.scrollSpeed!==18;
        case 'highlight': return s.highlightColor!=='#ffff00';
        case 'size': return s.typefaceSize!==16;
        case 'width': return s.pageWidth!==1250;
        case 'markers': return s.markers&&s.markers.length>0;
      }
      return false;
    };

    const TAB_GROUPS=[
      {label:'TYPE', ids:['font','size','spacing','width']},
      {label:'COLOR', ids:['highlight','color','markers','headings','night']},
      {label:'TOOLS', ids:['scroll','bullet','emoji','tasks','images','paper','reader']},
      {label:'MORE', ids:['themes','presets']},
    ];

    const renderTab=(id)=>{
      this.settings.activeTab=id;
      content.empty();
      sidebar.querySelectorAll('.tz-tab').forEach(b=>{
        const active=b.dataset.id===id;
        b.style.setProperty('background',active?'var(--tz-surface-high)':'transparent','important');
        b.style.setProperty('color',active?'var(--tz-primary)':'var(--tz-muted)','important');
        b.style.setProperty('border-left',active?'2px solid var(--tz-primary-strong)':'2px solid transparent','important');
        b.style.setProperty('transform',active?'scale(.98)':'scale(1)','important');
      });
      if(this['renderTab_'+id]) this['renderTab_'+id](content);
    };

    const visibleTabs=this.getVisibleTabs();
    TAB_GROUPS.forEach(group=>{
      const groupTabs=group.ids.filter(id=>visibleTabs.includes(id));
      if(!groupTabs.length) return;
      const grpEl=sidebar.createEl('div',{text:group.label});
      Object.assign(grpEl.style,{fontSize:'8px',fontWeight:'700',letterSpacing:'0.14em',color:'var(--tz-faint)',padding:'10px 8px 4px',userSelect:'none',fontFamily:'"Space Grotesk","Azeret Mono","Noto Sans Mono",monospace'});
      groupTabs.forEach(id=>{
        const active=isTabActive(id);
        const btn=sidebar.createEl('button');
        btn.className='tz-tab';btn.dataset.id=id;btn.title=t.tabTitles[id];
        Object.assign(btn.style,{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:'3px',width:'100%',padding:'9px 4px',border:'none',borderLeft:'2px solid transparent',cursor:'pointer',background:'transparent',color:'var(--tz-muted)',position:'relative'});
        const icon=btn.createEl('span');
        const icons={scroll:'arrow-down-up',width:'move-horizontal',font:'type',spacing:'list',size:'a-large-small',highlight:'highlighter',markers:'map-pin',headings:'heading-1',emoji:'smile',bullet:'list',color:'palette',night:'moon',paper:'file-text',themes:'palette',presets:'sliders-horizontal',images:'image',tasks:'square-check',columns:'columns-2',reader:'book-open'};
        setIcon(icon,icons[id]||'settings');
        icon.className='tz-icon';
        icon.style.cssText='font-size:20px;line-height:1;';
        btn.createEl('span',{text:t.tabTitles[id]}).style.cssText='font-size:8px;max-width:76px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-family:"Space Grotesk","Azeret Mono","Noto Sans Mono",monospace;letter-spacing:.08em;text-transform:uppercase;';
        if(active){
          const dot=btn.createEl('span');
          dot.style.cssText='position:absolute;top:6px;right:7px;width:4px;height:4px;background:var(--tz-tertiary);box-shadow:0 0 8px rgba(211,187,255,.4);';
        }
        btn.onmouseenter=()=>{if(this.settings.activeTab!==id) btn.style.background='rgba(55,57,62,.55)';};
        btn.onmouseleave=()=>{if(this.settings.activeTab!==id) btn.style.background='transparent';};
        btn.onclick=()=>renderTab(id);
      });
      const div=sidebar.createEl('div');
      div.style.cssText='height:1px;background:rgba(68,70,85,.18);margin:5px 10px;';
    });

    popup.appendChild(header);
    popup.appendChild(body);

    const activeTab=visibleTabs.includes(this.settings.activeTab)?this.settings.activeTab:visibleTabs[0];
    renderTab(activeTab);

    this.popupOutsideClick=(e)=>{if(!popup.contains(e.target)&&!this.statusBarEl.contains(e.target))this.closePopup();};
    this.popupClickTimer=setTimeout(()=>document.addEventListener('click',this.popupOutsideClick),100);
    document.body.appendChild(popup);
  }

  // ==== TABS ====
  renderTab_scroll(el){const t=this.t;
    const mod=el.createEl('div'); mod.className='tz-module';
    mod.createEl('div',{text:'01 // SCROLL ENGINE'}).className='tz-module-title';
    mod.createEl('div',{text:'Configure inertial wheel behavior and response speed for a smoother tactical reading flow.'}).style.cssText='font-size:12px;color:var(--tz-muted);margin-bottom:12px;line-height:1.45;';
    const tr = mod.createEl('div'); Object.assign(tr.style, {display:'flex', alignItems:'center', gap:'10px', margin:'8px 0 12px',padding:'10px 12px',background:'var(--tz-surface-highest)'});
    const textWrap=tr.createEl('div'); textWrap.style.flex='1';
    textWrap.createEl('div', {text: 'Smooth Mouse Scroll'}).style.cssText = 'font-size:13px;font-weight:700;';
    textWrap.createEl('div', {text: 'Inject eased wheel motion across editor and reading surfaces.'}).style.cssText = 'font-size:11px;color:var(--tz-muted);margin-top:2px;';
    const tg = tr.createEl('input'); tg.type = 'checkbox'; tg.checked = this.settings.scrollEnabled;
    tg.style.cssText='width:18px;height:18px;cursor:pointer;accent-color:var(--interactive-accent);';
    tg.onchange = async () => { this.settings.scrollEnabled = tg.checked; this.reattachScrollHandlers(); await this.saveSettings(); el.empty(); this.renderTab_scroll(el); };
    if(!this.settings.scrollEnabled) {
      const off=mod.createEl('div',{text:'SCROLL ENGINE OFFLINE'});
      off.style.cssText='font-size:10px;color:var(--tz-faint);letter-spacing:.14em;text-transform:uppercase;font-family:"Space Grotesk","Azeret Mono","Noto Sans Mono",monospace;';
      return;
    }
    const stat=mod.createEl('div');
    Object.assign(stat.style,{display:'flex',justifyContent:'space-between',alignItems:'end',marginBottom:'8px'});
    stat.createEl('div',{text:'INERTIA RESPONSE'}).style.cssText='font-size:10px;color:var(--tz-faint);letter-spacing:.12em;text-transform:uppercase;font-family:"Space Grotesk","Azeret Mono","Noto Sans Mono",monospace;';
    stat.createEl('div',{text:String(this.settings.scrollSpeed)}).style.cssText='font-size:18px;color:var(--tz-primary);font-weight:700;font-family:"Space Grotesk","Azeret Mono","Noto Sans Mono",monospace;';
    this.mkSlider(mod,{min:1,max:30,step:1,value:this.settings.scrollSpeed,left:t.scrollLeft,right:t.scrollRight,defaultVal:18,onChange:async v=>{this.settings.scrollSpeed=v;this.reattachScrollHandlers();await this.saveSettings();const valueEl=stat.lastChild;if(valueEl)valueEl.textContent=String(v);}});
    const footer=mod.createEl('div');
    footer.style.cssText='margin-top:8px;padding-top:10px;border-top:1px solid rgba(68,70,85,.18);display:flex;justify-content:space-between;align-items:center;';
    footer.createEl('div',{text:'■ WHEEL INTERCEPT ACTIVE'}).style.cssText='font-size:9px;color:var(--tz-faint);letter-spacing:.1em;text-transform:uppercase;font-family:"Space Grotesk","Azeret Mono","Noto Sans Mono",monospace;';
    footer.createEl('div',{text:'SYNCED'}).style.cssText='font-size:9px;color:var(--tz-primary);letter-spacing:.14em;text-transform:uppercase;font-family:"Space Grotesk","Azeret Mono","Noto Sans Mono",monospace;';
  }

  renderTab_width(el){
    const t=this.t;
    const mod=el.createEl('div'); mod.className='tz-module';
    mod.createEl('div',{text:'01 // PAGE WIDTH'}).className='tz-module-title';
    const hint=mod.createEl('div',{text:t.tp_width});
    hint.style.cssText='font-size:12px;color:var(--tz-muted);margin-bottom:10px;line-height:1.45;';
    const vl=mod.createEl('div',{text:this.settings.pageWidth+'px'});
    Object.assign(vl.style,{fontSize:'28px',fontWeight:'800',margin:'4px 0 10px',color:'var(--tz-primary)',fontFamily:'"Space Grotesk","Azeret Mono","Noto Sans Mono",monospace',letterSpacing:'0.04em'});
    this.mkSlider(mod,{min:400,max:1600,step:50,value:this.settings.pageWidth,left:t.widthLeft,right:t.widthRight,defaultVal:1250,onChange:async v=>{this.settings.pageWidth=v;vl.textContent=v+'px';this.applyWidth();await this.saveSettings();}});
    const row=mod.createEl('div');Object.assign(row.style,{display:'flex',gap:'6px',marginTop:'8px',justifyContent:'flex-start',flexWrap:'wrap'});
    [500,700,900,1250].forEach(w=>{const btn=row.createEl('button',{text:String(w)});this.mkPresetBtn(btn,this.settings.pageWidth===w);btn.onclick=async()=>{this.settings.pageWidth=w;vl.textContent=w+'px';this.applyWidth();await this.saveSettings();row.querySelectorAll('button').forEach(b=>this.mkPresetBtn(b,false));this.mkPresetBtn(btn,true);};});
    this.mkResetBtn(mod, '↺ Reset', async() => { this.settings.pageWidth=1250; this.applyWidth(); await this.saveSettings(); el.empty(); this.renderTab_width(el); });
  }

  renderTab_font(el){
    const t=this.t;const fonts=this.getAvailableFonts();
    const mod=el.createEl('div'); mod.className='tz-module';
    mod.createEl('div',{text:'01 // FONT ENGINE'}).className='tz-module-title';
    mod.createEl('div',{text:'Font Engine'}).style.cssText='font-size:28px;font-weight:800;letter-spacing:-0.04em;color:var(--tz-text);margin-bottom:4px;';
    mod.createEl('div',{text:'CALIBRATE BODY AND INTERFACE TYPOGRAPHY FOR READING, WRITING, AND SYSTEM CHROME'}).style.cssText='font-size:10px;color:var(--tz-faint);margin-bottom:12px;line-height:1.45;letter-spacing:.14em;text-transform:uppercase;font-family:"Space Grotesk","Azeret Mono","Noto Sans Mono",monospace;';
    const mkF = (label, key, applyFn) => {
        this.mkLabel(mod, label);
        const wrap = mod.createEl('div', {style: 'display:flex; gap:8px; margin-bottom:8px; flex-wrap:wrap;'});
        const bs=this.mkSelect(wrap, fonts, this.settings[key], t.fontDefault); bs.style.flex='1'; bs.style.minWidth='120px';
        const bt=wrap.createEl('input', {type:'text', placeholder:'Or try: Arial, Times...', value:this.settings[key]});
        bt.style.cssText = 'flex:1; min-width:120px; padding:7px 8px 6px; font-size:11px; background:var(--background-primary-alt); border:none; border-bottom:2px solid color-mix(in srgb, var(--background-modifier-border) 60%, transparent); color:var(--text-normal); font-family:\"Space Grotesk\",\"Azeret Mono\",\"Noto Sans Mono\",monospace;';
        const sync=async(v)=>{this.settings[key]=v; bt.value=v; bs.value=fonts.includes(v)?v:''; applyFn(); await this.saveSettings();};
        bs.onchange=()=>sync(bs.value); bt.onchange=()=>sync(bt.value); return bt;
    };
    const bInput = mkF(t.bodyFont, 'bodyFont', ()=>this.applyFont());
    const pv=mod.createEl('div');Object.assign(pv.style,{margin:'8px 0 12px',padding:'12px',fontSize:'12px',background:'var(--tz-surface-highest)',fontFamily:this.settings.bodyFont||'inherit',color:'var(--tz-muted)',lineHeight:'1.7'});
    pv.createEl('div',{text:'LIVE PREVIEW ENGINE'}).style.cssText='font-size:9px;color:var(--tz-primary);letter-spacing:.12em;text-transform:uppercase;font-family:"Space Grotesk","Azeret Mono","Noto Sans Mono",monospace;margin-bottom:8px;';
    const previewBody=pv.createEl('div');
    previewBody.createEl('div',{text:'ENG_LATIN_TEST'}).style.cssText='font-size:9px;color:var(--tz-faint);letter-spacing:.1em;text-transform:uppercase;margin-bottom:4px;font-family:"Space Grotesk","Azeret Mono","Noto Sans Mono",monospace;';
    previewBody.createEl('div',{text:'The quick brown fox jumps over the lazy dog. System intelligence is calibrated for precision and legibility.'}).style.cssText='font-size:14px;color:var(--tz-text);line-height:1.65;margin-bottom:10px;';
    const sep=previewBody.createEl('div'); sep.style.cssText='height:1px;background:rgba(68,70,85,.18);margin:8px 0 10px;';
    previewBody.createEl('div',{text:'UKR_CYRILLIC_TEST'}).style.cssText='font-size:9px;color:var(--tz-faint);letter-spacing:.1em;text-transform:uppercase;margin-bottom:4px;font-family:"Space Grotesk","Azeret Mono","Noto Sans Mono",monospace;';
    previewBody.createEl('div',{text:'Швидка лисиця — The quick brown fox'}).style.cssText='font-size:14px;color:var(--tz-text);line-height:1.65;';
    bInput.addEventListener('change',()=>pv.style.fontFamily=this.settings.bodyFont||'inherit');
    mkF(t.uiFont, 'uiFont', ()=>this.applyFont());
    this.mkResetBtn(mod,t.resetFonts,async()=>{this.settings.bodyFont='';this.settings.uiFont='';this.applyFont();await this.saveSettings(); el.empty(); this.renderTab_font(el);});
  }

  renderTab_spacing(el){
    const t=this.t;
    this.mkLabel(el,t.lineSpacing);const s1=this.mkSlider(el,{min:1.0,max:3.0,step:0.1,value:this.settings.lineSpacing,left:'tight',right:'loose',defaultVal:1.5,onChange:async v=>{this.settings.lineSpacing=v;this.applySpacing();await this.saveSettings();}});
    this.mkLabel(el,t.paraSpacing);const s2=this.mkSlider(el,{min:0.0,max:3.0,step:0.1,value:this.settings.paragraphSpacing,left:'none',right:'spacious',defaultVal:1.0,onChange:async v=>{this.settings.paragraphSpacing=v;this.applySpacing();await this.saveSettings();}});
    this.mkLabel(el,t.letterSpacing);const s3=this.mkSlider(el,{min:-0.05,max:0.2,step:0.005,value:this.settings.letterSpacing,left:'tight',right:'wide',defaultVal:0,onChange:async v=>{this.settings.letterSpacing=v;this.applySpacing();await this.saveSettings();}});
    this.mkResetBtn(el,t.resetSpacing,async()=>{this.settings.lineSpacing=1.5;this.settings.paragraphSpacing=1.0;this.settings.letterSpacing=0;this.applySpacing();await this.saveSettings();el.empty();this.renderTab_spacing(el);});
  }

  renderTab_size(el){
    const t=this.t;this.mkLabel(el,t.typefaceSize);
    const vl=el.createEl('div',{text:this.settings.typefaceSize+'px'});Object.assign(vl.style,{textAlign:'center',fontSize:'22px',fontWeight:'700',margin:'4px 0 6px',color:'var(--text-accent)'});
    this.mkSlider(el,{min:10,max:28,step:1,value:this.settings.typefaceSize,left:t.typefaceSizeLeft,right:t.typefaceSizeRight,defaultVal:16,onChange:async v=>{this.settings.typefaceSize=v;vl.textContent=v+'px';this.applyTypefaceSize();await this.saveSettings();}});
    this.mkResetBtn(el,'↺ Reset',async()=>{this.settings.typefaceSize=16;this.applyTypefaceSize();await this.saveSettings();el.empty();this.renderTab_size(el);});
  }

  renderTab_highlight(el){
    const t=this.t;this.mkLabel(el,t.highlight);
    const {updateColor}=this.mkColorPicker(el,this.settings.highlightColor,async c=>{this.settings.highlightColor=c;this.applyHighlight();await this.saveSettings();});
    this.mkLabel(el,t.neonPresets);const grid=el.createEl('div');Object.assign(grid.style,{display:'flex',flexWrap:'wrap',gap:'5px',marginBottom:'8px'});
    NEON_PRESETS.forEach(p=>{const btn=grid.createEl('button',{text:p.label});Object.assign(btn.style,{padding:'3px 7px',fontSize:'10px',cursor:'pointer',border:'2px solid '+p.color,background:p.color+'22',color:p.color,fontFamily:'var(--font-monospace)'});btn.onclick=()=>updateColor(p.color);});
    this.mkResetBtn(el,t.resetHighlight,()=>updateColor('#ffff00'));
    el.createEl('div',{text:t.highlightHint}).style.cssText='margin-top:8px;padding:7px;border:1px dashed var(--background-modifier-border);font-size:11px;color:var(--text-muted);';
  }

  renderTab_markers(el){
    const t=this.t;
    const mod=el.createEl('div'); mod.className='tz-module';
    mod.createEl('div',{text:'01 // MARKER DECK'}).className='tz-module-title';
    mod.createEl('div',{text:t.tp_markers}).style.cssText='font-size:12px;color:var(--tz-muted);margin-bottom:10px;line-height:1.45;';
    this.mkLabel(mod,t.markers);
    const applyRow=mod.createEl('div');Object.assign(applyRow.style,{display:'flex',gap:'6px',flexWrap:'wrap',marginBottom:'12px',minHeight:'28px'});
    if(!this.settings.markers||this.settings.markers.length===0){applyRow.createEl('div',{text:t.markersNone}).style.cssText='font-size:11px;color:var(--text-muted);align-self:center;';}
    else{this.settings.markers.forEach(m=>{const btn=applyRow.createEl('button',{text:m.name});btn.setAttribute('style',`padding:6px 10px !important;font-size:10px !important;cursor:pointer !important;background:${m.color} !important;border:1px solid ${m.color} !important;color:${contrastText(m.color)} !important;font-family:"Space Grotesk","Azeret Mono","Noto Sans Mono",monospace !important;font-weight:700 !important;letter-spacing:.06em !important;text-transform:uppercase !important; max-width:120px; text-overflow:ellipsis; overflow:hidden; white-space:nowrap;`);btn.title=t.markersApply;btn.onclick=()=>this.applyMarkerToSelection(m);});}
    this.mkLabel(mod,t.markersAdd);
    const addRow=mod.createEl('div');Object.assign(addRow.style,{display:'flex',gap:'8px',alignItems:'center',marginBottom:'8px'});
    const ci=addRow.createEl('input');ci.type='color';ci.value='#ff2d78';Object.assign(ci.style,{width:'36px',height:'32px',border:'2px solid var(--interactive-accent)',cursor:'pointer',padding:'2px',flexShrink:'0'});
    const ni=addRow.createEl('input');ni.type='text';ni.placeholder=t.markersName;Object.assign(ni.style,{flex:'1',padding:'7px 8px 6px',background:'var(--background-primary-alt)',border:'none',borderBottom:'2px solid color-mix(in srgb, var(--background-modifier-border) 60%, transparent)',color:'var(--text-normal)',fontFamily:'"Space Grotesk","Azeret Mono","Noto Sans Mono",monospace',fontSize:'11px'});
    const ab=addRow.createEl('button',{text:'ADD'});Object.assign(ab.style,{padding:'6px 12px',cursor:'pointer',background:'linear-gradient(135deg,var(--tz-primary),var(--tz-primary-strong))',border:'none',color:'#111317',fontWeight:'800',fontSize:'10px',fontFamily:'"Space Grotesk","Azeret Mono","Noto Sans Mono",monospace',letterSpacing:'.08em'});
    ab.onclick=async()=>{
      if((this.settings.markers||[]).length>=10){new Notice('Max 10 markers allowed!');return;}
      const name=ni.value.trim();if(!name){new Notice('Enter a name!');return;}
      this.settings.markers=[...(this.settings.markers||[]),{id:'m'+Date.now(),name,color:ci.value}];this.applyMarkers();await this.saveSettings();el.empty();this.renderTab_markers(el);
    };
    if(this.settings.markers&&this.settings.markers.length>0){this.mkLabel(mod,'Manage');this.settings.markers.forEach((m,idx)=>{const row=mod.createEl('div');Object.assign(row.style,{display:'flex',alignItems:'center',gap:'8px',marginBottom:'6px',padding:'8px 10px',background:'var(--tz-surface-high)'});const sw=row.createEl('div');Object.assign(sw.style,{width:'16px',height:'16px',background:m.color,border:'1px solid rgba(68,70,85,.22)',flexShrink:'0'});row.createEl('span',{text:m.name}).style.cssText='flex:1;font-size:12px;';const db=row.createEl('button',{text:'DELETE'});Object.assign(db.style,{padding:'4px 7px',cursor:'pointer',border:'1px solid rgba(68,70,85,.2)',background:'transparent',color:'var(--tz-muted)',fontSize:'10px',fontFamily:'"Space Grotesk","Azeret Mono","Noto Sans Mono",monospace',letterSpacing:'.06em'});db.onclick=async()=>{this.settings.markers.splice(idx,1);this.applyMarkers();await this.saveSettings();el.empty();this.renderTab_markers(el);};});}
  }

  applyMarkerToSelection(marker){
    const view=this.app.workspace.getActiveViewOfType(MarkdownView);
    if(!view||!view.editor||view.getMode()!=='source'){new Notice('Need edit mode!');return;}
    const editor=view.editor;const sel=editor.getSelection();
    if(!sel){new Notice('Select text first!');return;}
    editor.replaceSelection(`<mark class="tz-mark-${marker.id}">${sel}</mark>`);
    new Notice(`Marked globally with ${marker.name}!`);
  }

  renderTab_headings(el){
    const t=this.t;
    const mod=el.createEl('div'); mod.className='tz-module';
    mod.createEl('div',{text:'01 // HEADING DECK'}).className='tz-module-title';
    mod.createEl('div',{text:'Decorate H1-H6 with tactical underlines, framing, background bands, and emphasis modes.'}).style.cssText='font-size:12px;color:var(--tz-muted);margin-bottom:12px;line-height:1.45;';
    for(let i=1;i<=6;i++){
      const row=mod.createEl('div');
      Object.assign(row.style,{display:'flex',alignItems:'center',gap:'10px',marginBottom:'8px',padding:'10px 12px',background:'var(--tz-surface-highest)'});
      const lbl=row.createEl('span',{text:`H${i}`});
      Object.assign(lbl.style,{fontWeight:'800',fontSize:'13px',width:'30px',color:'var(--tz-primary)',flexShrink:'0',fontFamily:'"Space Grotesk","Azeret Mono","Noto Sans Mono",monospace',letterSpacing:'.06em'});
      const preview=row.createEl('div',{text:`Heading level ${i}`});
      preview.style.cssText='flex:1;font-size:12px;color:var(--tz-text);';
      const sel=row.createEl('select');
      Object.assign(sel.style,{width:'180px',padding:'6px 8px',background:'var(--background-primary-alt)',border:'none',borderBottom:'2px solid color-mix(in srgb, var(--background-modifier-border) 60%, transparent)',color:'var(--text-normal)',fontFamily:'"Space Grotesk","Azeret Mono","Noto Sans Mono",monospace',fontSize:'10px',cursor:'pointer'});
      HEADING_STYLES.forEach(s=>{const opt=sel.createEl('option',{text:s.label,value:s.value});if(s.value===(this.settings[`h${i}Style`]||'none'))opt.selected=true;});
      sel.onchange=async()=>{this.settings[`h${i}Style`]=sel.value;this.applyHeadings();await this.saveSettings();};
    }
    this.mkResetBtn(mod,t.resetHeadings,async()=>{for(let i=1;i<=6;i++)this.settings[`h${i}Style`]='none';this.applyHeadings();await this.saveSettings();el.empty();this.renderTab_headings(el);});
  }

  renderTab_emoji(el){
    const t=this.t;
    const mod=el.createEl('div'); mod.className='tz-module';
    mod.createEl('div',{text:'01 // EMOJI GRID'}).className='tz-module-title';
    const search=mod.createEl('input');search.type='text';search.placeholder=t.emojiSearch;Object.assign(search.style,{width:'100%',padding:'8px 10px',marginBottom:'6px',boxSizing:'border-box',background:'var(--background-primary-alt)',border:'none',borderBottom:'2px solid color-mix(in srgb, var(--background-modifier-border) 60%, transparent)',color:'var(--text-normal)',fontFamily:'"Space Grotesk","Azeret Mono","Noto Sans Mono",monospace',fontSize:'11px'});
    mod.createEl('div',{text:t.emojiHint}).style.cssText='font-size:9px;color:var(--tz-faint);margin-bottom:8px;letter-spacing:.08em;text-transform:uppercase;font-family:"Space Grotesk","Azeret Mono","Noto Sans Mono",monospace;';
    const grid=mod.createEl('div');Object.assign(grid.style,{display:'flex',flexWrap:'wrap',gap:'4px',maxHeight:'340px',overflowY:'auto',padding:'4px',background:'var(--tz-surface-highest)'});
    const ins=emoji=>{const view=this.app.workspace.getActiveViewOfType(MarkdownView);if(view&&view.editor&&view.getMode()==='source'){const e=view.editor,c=e.getCursor();e.replaceRange(emoji,c);e.setCursor({line:c.line,ch:c.ch+emoji.length});e.focus();}else{navigator.clipboard.writeText(emoji);new Notice('📋 '+emoji);}};
    const cp=emoji=>{navigator.clipboard.writeText(emoji);new Notice('📋 '+emoji);};
    const render=filter=>{grid.empty();const add=emoji=>{const btn=grid.createEl('button',{text:emoji});Object.assign(btn.style,{fontSize:'18px',width:'30px',height:'30px',cursor:'pointer',background:'transparent',border:'1px solid transparent',lineHeight:'1',display:'flex',alignItems:'center',justifyContent:'center'});btn.onmouseenter=()=>btn.style.background='rgba(55,57,62,.8)';btn.onmouseleave=()=>btn.style.background='transparent';btn.onclick=e=>{e.stopPropagation();ins(emoji);};btn.oncontextmenu=e=>{e.preventDefault();e.stopPropagation();cp(emoji);};};if(filter){const f=filter.toLowerCase(); const matches = Object.keys(EM_KEYWORDS).filter(k=>k.includes(f)).map(k=>EM_KEYWORDS[k]); EMOJI_GROUPS.forEach(g=>{if(g.label.toLowerCase().includes(f)){g.emojis.forEach(add);}else{g.emojis.filter(e=>e.includes(f)||matches.includes(e)).forEach(add);}});}else{EMOJI_GROUPS.forEach(g=>{const l=grid.createEl('div',{text:g.label});Object.assign(l.style,{width:'100%',fontSize:'9px',color:'var(--tz-faint)',margin:'8px 0 2px',letterSpacing:'.1em',textTransform:'uppercase',fontFamily:'"Space Grotesk","Azeret Mono","Noto Sans Mono",monospace'});g.emojis.forEach(add);});}};
    search.oninput=()=>render(search.value.trim());render('');
  }

  renderTab_bullet(el){
    const t=this.t;this.mkLabel(el,t.bullet);
    const cr=el.createEl('div');Object.assign(cr.style,{display:'flex',gap:'8px',alignItems:'center', marginBottom:'10px'});
    const customInput=cr.createEl('input');customInput.type='text';customInput.placeholder='★ or 🔥';customInput.value=this.settings.bulletCustom;Object.assign(customInput.style,{flex:'1',padding:'6px 8px',background:'var(--background-modifier-form-field)',border:'2px solid var(--background-modifier-border)',color:'var(--text-normal)',fontFamily:'var(--font-monospace)',fontSize:'16px'});
    const ab=cr.createEl('button',{text:'✓'});Object.assign(ab.style,{padding:'6px 10px',cursor:'pointer',background:'var(--interactive-accent)',border:'2px solid var(--interactive-accent)',color:'var(--background-primary)',fontWeight:'700',fontSize:'14px'});
    const grid=el.createEl('div');Object.assign(grid.style,{display:'flex',flexWrap:'wrap',gap:'6px',marginBottom:'10px'});
    BULLET_PRESETS.forEach(p=>{const btn=grid.createEl('button',{text:p.label});this.mkPresetBtn(btn,this.settings.bulletStyle===p.value&&!this.settings.bulletCustom);btn.onclick=async()=>{this.settings.bulletStyle=p.value;this.settings.bulletCustom='';customInput.value='';this.applyBullet();await this.saveSettings();grid.querySelectorAll('button').forEach(b=>this.mkPresetBtn(b,false));this.mkPresetBtn(btn,true);};});
    ab.onclick=async()=>{this.settings.bulletCustom=customInput.value.trim();this.settings.bulletStyle='';this.applyBullet();await this.saveSettings();grid.querySelectorAll('button').forEach(b=>this.mkPresetBtn(b,false));new Notice('Bullet applied');};
    this.mkResetBtn(el,'↺ Reset',async()=>{this.settings.bulletCustom='';this.settings.bulletStyle='';this.applyBullet();await this.saveSettings();el.empty();this.renderTab_bullet(el);});
  }

  renderTab_color(el){
    const t=this.t;this.mkLabel(el,t.textColor);
    const {updateColor}=this.mkColorPicker(el,this.settings.textColor||'#e0e0e0',async c=>{this.settings.textColor=c;this.applyTextColor();await this.saveSettings();});
    this.mkLabel(el,t.neonPresets);const grid=el.createEl('div');Object.assign(grid.style,{display:'flex',flexWrap:'wrap',gap:'5px',marginBottom:'10px'});
    NEON_PRESETS.forEach(p=>{const btn=grid.createEl('button',{text:p.label});Object.assign(btn.style,{padding:'3px 7px',fontSize:'10px',cursor:'pointer',border:'2px solid '+p.color,background:p.color+'22',color:p.color});btn.onclick=()=>updateColor(p.color);});
    this.mkResetBtn(el,t.textColorReset,async()=>{this.settings.textColor='';this.applyTextColor();await this.saveSettings();el.empty();this.renderTab_color(el);});
  }

  renderTab_images(el){
    const t=this.t;
    this.mkLabel(el,t.imagesWidth);this.mkSlider(el,{min:10,max:100,step:5,value:this.settings.imageMaxWidth,left:'10%',right:'100%',defaultVal:100,onChange:async v=>{this.settings.imageMaxWidth=v;this.applyImages();await this.saveSettings();}});
    this.mkLabel(el,t.imagesFilter);const s1=this.mkSelect(el,['none','grayscale','invert'],this.settings.imageFilter,'none');s1.onchange=async()=>{this.settings.imageFilter=s1.value||'none';this.applyImages();await this.saveSettings();};
    const row=el.createEl('div');Object.assign(row.style,{display:'flex',alignItems:'center',gap:'10px',margin:'10px 0'});row.createEl('span',{text:t.imagesShadow}).style.cssText='font-size:12px;flex:1;';
    const tg=row.createEl('input');tg.type='checkbox';tg.checked=this.settings.imageShadow;tg.onchange=async()=>{this.settings.imageShadow=tg.checked;this.applyImages();await this.saveSettings();};
    this.mkResetBtn(el,'↺ Reset Images',async()=>{this.settings.imageMaxWidth=100;this.settings.imageFilter='none';this.settings.imageShadow=false;this.applyImages();await this.saveSettings();el.empty();this.renderTab_images(el);});
  }

  renderTab_tasks(el){
    const t=this.t;
    this.mkLabel(el,t.taskStyle);const s1=this.mkSelect(el,['default','round','filled'],this.settings.taskStyle,'default');s1.onchange=async()=>{this.settings.taskStyle=s1.value||'default';this.applyTasks();await this.saveSettings();};
    const row=el.createEl('div');Object.assign(row.style,{display:'flex',alignItems:'center',gap:'10px',margin:'10px 0'});row.createEl('span',{text:t.taskDim}).style.cssText='font-size:12px;flex:1;';
    const tg=row.createEl('input');tg.type='checkbox';tg.checked=this.settings.taskDim;tg.onchange=async()=>{this.settings.taskDim=tg.checked;this.applyTasks();await this.saveSettings();};
    this.mkResetBtn(el,'↺ Reset Tasks',async()=>{this.settings.taskStyle='default';this.settings.taskDim=false;this.applyTasks();await this.saveSettings();el.empty();this.renderTab_tasks(el);});
  }

  renderTab_columns(el){
    const t=this.t;this.mkLabel(el,t.colCount);this.mkSlider(el,{min:1,max:4,step:1,value:this.settings.columnsCount,left:'1',right:'4',defaultVal:1,onChange:async v=>{this.settings.columnsCount=v;this.applyColumns();await this.saveSettings();}});
    this.mkResetBtn(el,'↺ Reset Columns',async()=>{this.settings.columnsCount=1;this.applyColumns();await this.saveSettings();el.empty();this.renderTab_columns(el);});
  }

  renderTab_reader(el){
    const t=this.t;
    const mkT = (label, key, cb) => {
        const row=el.createEl('div');Object.assign(row.style,{display:'flex',alignItems:'center',gap:'10px',margin:'10px 0'});row.createEl('span',{text:label}).style.cssText='font-size:12px;flex:1;';
        const tg=row.createEl('input');tg.type='checkbox';tg.checked=this.settings[key];
        tg.onchange=async()=>{this.settings[key]=tg.checked; cb(); await this.saveSettings();};
    };
    mkT(t.ruler, 'rulerEnabled', ()=>this.applyReader());
    mkT(t.progress, 'progressEnabled', ()=>this.applyReader());
    this.mkResetBtn(el,'↺ Reset Reader',async()=>{this.settings.rulerEnabled=false;this.settings.progressEnabled=false;this.applyReader();await this.saveSettings();el.empty();this.renderTab_reader(el);});
  }

  renderTab_night(el){
    const t=this.t;this.mkLabel(el,t.sepia);
    const tr=el.createEl('div');Object.assign(tr.style,{display:'flex',alignItems:'center',gap:'10px',margin:'8px 0 10px'});tr.createEl('span',{text:t.sepiaToggle}).style.cssText='font-size:12px;flex:1;';
    const tg=tr.createEl('input');tg.type='checkbox';tg.checked=this.settings.sepiaEnabled;tg.style.cssText='width:18px;height:18px;cursor:pointer;accent-color:var(--interactive-accent);';
    tg.onchange=async()=>{this.settings.sepiaEnabled=tg.checked;this.applySepia();await this.saveSettings();};
    this.mkLabel(el,t.sepiaIntensity);this.mkSlider(el,{min:10,max:100,step:5,value:this.settings.sepiaIntensity,left:'🌤 light',right:'🌑 deep',defaultVal:40,onChange:async v=>{this.settings.sepiaIntensity=v;this.applySepia();await this.saveSettings();}});
    this.mkResetBtn(el,'↺ Reset',async()=>{this.settings.sepiaEnabled=false;this.settings.sepiaIntensity=40;this.applySepia();await this.saveSettings();el.empty();this.renderTab_night(el);});
  }

  renderTab_paper(el){
    const t=this.t;
    const mod=el.createEl('div'); mod.className='tz-module';
    mod.createEl('div',{text:'01 // PAPER TEXTURE'}).className='tz-module-title';
    mod.createEl('div',{text:'Paper Engine'}).style.cssText='font-size:30px;font-weight:800;letter-spacing:-0.04em;color:var(--tz-text);margin-bottom:4px;';
    mod.createEl('div',{text:'CONFIGURE BACKGROUND CANVAS ARCHITECTURE'}).style.cssText='font-size:10px;color:var(--tz-faint);margin-bottom:14px;line-height:1.45;letter-spacing:.14em;text-transform:uppercase;font-family:"Space Grotesk","Azeret Mono","Noto Sans Mono",monospace;';
    this.mkLabel(mod,t.paper);
    const grid=mod.createEl('div');
    Object.assign(grid.style,{display:'grid',gridTemplateColumns:'repeat(3, minmax(0, 1fr))',gap:'8px',marginBottom:'16px'});
    const previewStyle = (pattern, color) => {
      const c = color || this.settings.paperColor || '#888888';
      const faint = c + '88';
      switch(pattern){
        case 'lined':
          return `background:
            linear-gradient(to bottom, transparent 0 15px, ${faint} 15px 16px) 0 0 / 100% 18px,
            #2a2c31;`;
        case 'grid':
          return `background:
            linear-gradient(${faint} 1px, transparent 1px),
            linear-gradient(90deg, ${faint} 1px, transparent 1px),
            #2a2c31;
            background-size: 16px 16px, 16px 16px, auto;`;
        case 'dots':
          return `background:
            radial-gradient(circle, ${faint} 1px, transparent 1.5px),
            #2a2c31;
            background-size: 13px 13px, auto;`;
        case 'dots_lg':
          return `background:
            radial-gradient(circle, ${faint} 1.4px, transparent 2px),
            #2a2c31;
            background-size: 18px 18px, auto;`;
        case 'ruled':
          return `background:
            linear-gradient(to bottom, transparent 0 15px, ${faint} 15px 16px) 0 0 / 100% 18px,
            linear-gradient(90deg, transparent 0 15%, ${color}aa 15% 16%, transparent 16% 100%),
            #2a2c31;`;
        case 'isometric':
          return `background:
            linear-gradient(30deg, ${faint} 12%, transparent 12.5%, transparent 87%, ${faint} 87.5%, ${faint}),
            linear-gradient(150deg, ${faint} 12%, transparent 12.5%, transparent 87%, ${faint} 87.5%, ${faint}),
            linear-gradient(90deg, ${faint} 2%, transparent 2.5%, transparent 97%, ${faint} 97.5%, ${faint}),
            #2a2c31;
            background-size: 22px 22px;`;
        case 'dots_sq':
          return `background:
            radial-gradient(circle, ${faint} 1px, transparent 1.6px),
            linear-gradient(${faint}22 1px, transparent 1px),
            linear-gradient(90deg, ${faint}22 1px, transparent 1px),
            #2a2c31;
            background-size: 14px 14px, 14px 14px, 14px 14px, auto;`;
        case 'none':
        default:
          return `background:
            radial-gradient(circle at 50% 50%, #9ea2b633 0 8px, transparent 9px),
            #2a2c31;`;
      }
    };
    const cards = [
      {value:'lined', label:'01 LINED'},
      {value:'grid', label:'02 GRID'},
      {value:'dots', label:'03 DOTS'},
      {value:'dots_lg', label:'04 DOTS LG'},
      {value:'ruled', label:'05 RULED'},
      {value:'isometric', label:'06 ISOMETRIC'},
      {value:'dots_sq', label:'07 DOT GRID'},
      {value:'none', label:'08 NONE'}
    ];
    cards.forEach(card=>{
      const btn=grid.createEl('button');
      const active=this.settings.paperPattern===card.value;
      Object.assign(btn.style,{
        padding:'0',
        border:active?'1px solid var(--tz-primary)':'1px solid rgba(68,70,85,.14)',
        background:'var(--tz-surface-highest)',
        cursor:'pointer',
        textAlign:'left',
        boxShadow:active?'0 0 0 1px rgba(189,194,255,.2) inset, 0 0 18px rgba(189,194,255,.08)':'none'
      });
      const thumb=btn.createEl('div');
      Object.assign(thumb.style,{
        height:'92px',
        margin:'8px 8px 0 8px',
        background:'#2a2c31',
        position:'relative'
      });
      thumb.style.cssText += previewStyle(card.value, this.settings.paperColor);
      if(card.value==='none'){
        const icon=thumb.createEl('div',{text:'⊘'});
        Object.assign(icon.style,{
          position:'absolute',
          inset:'0',
          display:'flex',
          alignItems:'center',
          justifyContent:'center',
          color:'#a7aac0',
          fontSize:'24px',
          fontWeight:'700'
        });
      }
      const caption=btn.createEl('div',{text:card.label});
      Object.assign(caption.style,{
        padding:'8px',
        fontSize:'10px',
        color:active?'var(--tz-primary)':'var(--tz-muted)',
        fontFamily:'"Space Grotesk","Azeret Mono","Noto Sans Mono",monospace',
        letterSpacing:'.08em',
        textTransform:'uppercase'
      });
      btn.onclick=async()=>{
        this.settings.paperPattern=card.value;
        this.applyPaper();
        await this.saveSettings();
        el.empty();
        this.renderTab_paper(el);
      };
    });
    const opWrap=mod.createEl('div');
    Object.assign(opWrap.style,{marginTop:'8px'});
    const opHead=opWrap.createEl('div');
    Object.assign(opHead.style,{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'8px'});
    opHead.createEl('span',{text:'PATTERN OPACITY'}).style.cssText='font-size:10px;color:var(--tz-faint);letter-spacing:.12em;text-transform:uppercase;font-family:"Space Grotesk","Azeret Mono","Noto Sans Mono",monospace;';
    opHead.createEl('span',{text:`${this.settings.paperOpacity}%`}).style.cssText='font-size:16px;color:var(--tz-primary);font-family:"Space Grotesk","Azeret Mono","Noto Sans Mono",monospace;font-weight:700;';
    this.mkSlider(opWrap,{min:5,max:60,step:5,value:this.settings.paperOpacity,left:'subtle',right:'strong',defaultVal:15,onChange:async v=>{this.settings.paperOpacity=v;this.applyPaper();await this.saveSettings();const valueEl=opHead.lastChild;if(valueEl)valueEl.textContent=`${v}%`;}});
    this.mkLabel(mod,t.paperColor);this.mkColorPicker(mod,this.settings.paperColor,async c=>{this.settings.paperColor=c;this.applyPaper();await this.saveSettings();el.empty();this.renderTab_paper(el);});
    const footer=mod.createEl('div');
    Object.assign(footer.style,{
      marginTop:'12px',
      paddingTop:'10px',
      borderTop:'1px solid rgba(68,70,85,.18)',
      display:'flex',
      justifyContent:'space-between',
      alignItems:'center'
    });
    footer.createEl('div',{text:'■ ENGINE LIVE   ID: TL-992-PAPER'}).style.cssText='font-size:9px;color:var(--tz-faint);letter-spacing:.1em;text-transform:uppercase;font-family:"Space Grotesk","Azeret Mono","Noto Sans Mono",monospace;';
    footer.createEl('div',{text:'READY'}).style.cssText='font-size:9px;color:var(--tz-primary);letter-spacing:.14em;text-transform:uppercase;font-family:"Space Grotesk","Azeret Mono","Noto Sans Mono",monospace;';
    this.mkResetBtn(mod,'↺ Reset paper',async()=>{this.settings.paperPattern='none';this.settings.paperOpacity=15;this.settings.paperColor='#888888';this.applyPaper();await this.saveSettings();el.empty();this.renderTab_paper(el);});
  }

  renderTab_themes(el){
    const t=this.t;
    const mod=el.createEl('div'); mod.className='tz-module';
    mod.createEl('div',{text:'01 // THEME SWITCHER'}).className='tz-module-title';
    mod.createEl('div',{text:'Theme Switcher'}).style.cssText='font-size:24px;font-weight:800;letter-spacing:-0.04em;color:var(--tz-text);margin-bottom:4px;';
    const cur=this.getCurrentTheme();mod.createEl('div',{text:`${t.themesCurrent} ${cur||'Default'}`}).style.cssText='font-size:10px;color:var(--tz-faint);margin-bottom:12px;letter-spacing:.12em;text-transform:uppercase;font-family:"Space Grotesk","Azeret Mono","Noto Sans Mono",monospace;';
    const themes=this.getInstalledThemes();const list=mod.createEl('div');Object.assign(list.style,{display:'flex',flexDirection:'column',gap:'6px',marginBottom:'12px'});
    const makeThemeRow=(label,isActive,onClick)=>{
      const row=list.createEl('button');
      Object.assign(row.style,{display:'flex',alignItems:'center',justifyContent:'space-between',gap:'10px',padding:'10px 12px',background:isActive?'var(--tz-surface-highest)':'var(--tz-surface-high)',border:isActive?'1px solid rgba(189,194,255,.25)':'1px solid rgba(68,70,85,.14)',cursor:'pointer',textAlign:'left'});
      const left=row.createEl('div'); left.style.cssText='display:flex;align-items:center;gap:10px;';
      const icon=left.createEl('div',{text:isActive?'◉':'○'}); icon.style.cssText=`font-size:12px;color:${isActive?'var(--tz-primary)':'var(--tz-faint)'};font-family:"Space Grotesk","Azeret Mono","Noto Sans Mono",monospace;`;
      left.createEl('div',{text:label}).style.cssText=`font-size:12px;color:${isActive?'var(--tz-text)':'var(--tz-muted)'};font-family:"Space Grotesk","Azeret Mono","Noto Sans Mono",monospace;letter-spacing:.06em;text-transform:uppercase;`;
      if(isActive){row.createEl('div',{text:'ACTIVE'}).style.cssText='font-size:9px;color:var(--tz-primary);letter-spacing:.12em;text-transform:uppercase;font-family:"Space Grotesk","Azeret Mono","Noto Sans Mono",monospace;';}
      row.onclick=onClick;
      return row;
    };
    makeThemeRow('Default',!cur,()=>{this.setTheme('');el.empty();this.renderTab_themes(el);});
    if(themes.length===0){list.createEl('div',{text:t.themesNone}).style.cssText='font-size:11px;color:var(--text-muted);;';}
    else{themes.forEach(theme=>makeThemeRow(theme,cur===theme,()=>{this.setTheme(theme);el.empty();this.renderTab_themes(el);}));}
    if(this.hasStyleSettings()){const ssBtn=mod.createEl('button',{text:t.openStyleSettings});Object.assign(ssBtn.style,{width:'100%',padding:'8px 10px',cursor:'pointer',background:'transparent',border:'1px solid rgba(68,70,85,.28)',color:'var(--tz-primary)',fontFamily:'"Space Grotesk","Azeret Mono","Noto Sans Mono",monospace',fontSize:'10px',fontWeight:'700',marginTop:'4px',letterSpacing:'.08em',textTransform:'uppercase'});ssBtn.onclick=()=>{this.app.setting.open();this.app.setting.openTabById('obsidian-style-settings');};}
  }

  renderTab_presets(el){
    const t=this.t;
    const mod=el.createEl('div'); mod.className='tz-module';
    mod.createEl('div',{text:'01 // PRESET STACK'}).className='tz-module-title';
    mod.createEl('div',{text:'Workspace Loadouts'}).style.cssText='font-size:24px;font-weight:800;letter-spacing:-0.04em;color:var(--tz-text);margin-bottom:4px;';
    mod.createEl('div',{text:'MODULE_ALPHA // PRESET_VAULT_R5'}).style.cssText='font-size:10px;color:var(--tz-faint);margin-bottom:12px;line-height:1.45;letter-spacing:.14em;text-transform:uppercase;font-family:"Space Grotesk","Azeret Mono","Noto Sans Mono",monospace;';
    this.mkLabel(mod,t.presetSave);
    const row=mod.createEl('div');Object.assign(row.style,{display:'flex',gap:'8px',marginBottom:'12px'});
    const ni=row.createEl('input');ni.type='text';ni.placeholder=t.presetName;Object.assign(ni.style,{flex:'1',padding:'7px 8px 6px',background:'var(--background-primary-alt)',border:'none',borderBottom:'2px solid color-mix(in srgb, var(--background-modifier-border) 60%, transparent)',color:'var(--text-normal)',fontFamily:'"Space Grotesk","Azeret Mono","Noto Sans Mono",monospace',fontSize:'11px'});
    const sb=row.createEl('button',{text:'COMMIT'});Object.assign(sb.style,{padding:'6px 12px',cursor:'pointer',background:'linear-gradient(135deg,var(--tz-primary),var(--tz-primary-strong))',border:'none',color:'#111317',fontFamily:'"Space Grotesk","Azeret Mono","Noto Sans Mono",monospace',fontWeight:'800',fontSize:'10px',letterSpacing:'.08em'});
    sb.onclick=async()=>{const name=ni.value.trim();if(!name){new Notice('Enter a name!');return;}const snap={name};Object.keys(DEFAULTS).forEach(k=>{if(k!=='presets'&&k!=='activeTab')snap[k]=this.settings[k];});this.settings.presets=[...(this.settings.presets||[]),snap];await this.saveSettings();ni.value='';el.empty();this.renderTab_presets(el);new Notice('✓ '+name);};
    this.mkLabel(mod,t.presetList);const list=mod.createEl('div');Object.assign(list.style,{display:'flex',flexDirection:'column',gap:'6px'});
    if(!this.settings.presets||this.settings.presets.length===0){list.createEl('div',{text:t.presetNone}).style.cssText='font-size:11px;color:var(--text-muted);';}
    else{this.settings.presets.forEach((p,idx)=>{const active=idx===this.settings.presets.length-1&&this.settings.activeTab==='presets';const pr=list.createEl('div');Object.assign(pr.style,{display:'flex',alignItems:'center',gap:'10px',padding:'10px 12px',background:active?'var(--tz-surface-highest)':'var(--tz-surface-high)',border:active?'1px solid rgba(189,194,255,.25)':'1px solid rgba(68,70,85,.14)'});const ico=pr.createEl('div',{text:idx===0?'◉':'○'});ico.style.cssText=`font-size:12px;color:${active?'var(--tz-primary)':'var(--tz-faint)'};font-family:"Space Grotesk","Azeret Mono","Noto Sans Mono",monospace;`;const meta=pr.createEl('div');meta.style.cssText='flex:1;display:flex;flex-direction:column;gap:3px;';meta.createEl('div',{text:p.name}).style.cssText=`font-size:12px;color:${active?'var(--tz-text)':'var(--tz-text)'};font-family:"Space Grotesk","Azeret Mono","Noto Sans Mono",monospace;letter-spacing:.06em;text-transform:uppercase;`;meta.createEl('div',{text:`SNAPSHOT // SLOT ${idx+1}`}).style.cssText='font-size:9px;color:var(--tz-faint);letter-spacing:.12em;text-transform:uppercase;font-family:"Space Grotesk","Azeret Mono","Noto Sans Mono",monospace;';const lb=pr.createEl('button',{text:'DEPLOY'});Object.assign(lb.style,{padding:'5px 8px',cursor:'pointer',border:'1px solid rgba(68,70,85,.24)',background:'transparent',color:'var(--tz-primary)',fontSize:'10px',fontFamily:'"Space Grotesk","Azeret Mono","Noto Sans Mono",monospace',letterSpacing:'.06em'});lb.onclick=async()=>{Object.assign(this.settings,p);this.applyAll();await this.saveSettings();new Notice('✓ '+p.name);};const db=pr.createEl('button',{text:'DELETE'});Object.assign(db.style,{padding:'5px 8px',cursor:'pointer',border:'1px solid rgba(68,70,85,.24)',background:'transparent',color:'var(--tz-muted)',fontSize:'10px',fontFamily:'"Space Grotesk","Azeret Mono","Noto Sans Mono",monospace',letterSpacing:'.06em'});db.onclick=async()=>{this.settings.presets.splice(idx,1);await this.saveSettings();el.empty();this.renderTab_presets(el);};});}
    const footer=mod.createEl('div');
    footer.style.cssText='margin-top:10px;padding-top:10px;border-top:1px solid rgba(68,70,85,.18);display:flex;justify-content:space-between;align-items:center;';
    footer.createEl('div',{text:`■ VAULT ONLINE   NODES: ${String((this.settings.presets||[]).length).padStart(2,'0')}/32`}).style.cssText='font-size:9px;color:var(--tz-faint);letter-spacing:.1em;text-transform:uppercase;font-family:"Space Grotesk","Azeret Mono","Noto Sans Mono",monospace;';
    footer.createEl('div',{text:'LOADOUT_PROTOCOL_V2'}).style.cssText='font-size:9px;color:var(--tz-primary);letter-spacing:.12em;text-transform:uppercase;font-family:"Space Grotesk","Azeret Mono","Noto Sans Mono",monospace;';
  }

  // ─── UI Helpers ───────────────────────────────────────────────────────────
  mkLabel(p,text){
    const el=p.createEl('div',{text});
    Object.assign(el.style,{
      fontSize:'10px',
      fontWeight:'700',
      letterSpacing:'0.12em',
      textTransform:'uppercase',
      color:'var(--interactive-accent)',
      marginBottom:'6px',
      marginTop:'12px',
      fontFamily:'"Space Grotesk","Azeret Mono","Noto Sans Mono",monospace'
    });
    return el;
  }
  mkSlider(p,{min,max,step,value,left,right,defaultVal,onChange}){
    const t=this.t;
    const wrap=p.createEl('div');
    Object.assign(wrap.style,{marginBottom:'10px'});
    const lr=wrap.createEl('div');
    Object.assign(lr.style,{
      display:'flex',
      justifyContent:'space-between',
      fontSize:'9px',
      color:'var(--text-faint)',
      marginBottom:'4px',
      fontFamily:'"Space Grotesk","Azeret Mono","Noto Sans Mono",monospace',
      letterSpacing:'0.06em',
      textTransform:'uppercase'
    });
    lr.createEl('span',{text:left});
    lr.createEl('span',{text:`${t.default}: ${defaultVal}`}).style.color='var(--text-muted)';
    lr.createEl('span',{text:right});
    const sl=wrap.createEl('input');
    sl.type='range';sl.min=String(min);sl.max=String(max);sl.step=String(step);sl.value=String(value);
    Object.assign(sl.style,{
      width:'100%',
      accentColor:'var(--interactive-accent)',
      cursor:'pointer',
      marginBottom:'4px'
    });
    const vl=wrap.createEl('div',{text:String(value)});
    Object.assign(vl.style,{
      textAlign:'right',
      fontSize:'10px',
      color:'var(--interactive-accent)',
      fontWeight:'700',
      fontFamily:'"Space Grotesk","Azeret Mono","Noto Sans Mono",monospace',
      letterSpacing:'0.08em'
    });
    sl.oninput=()=>{vl.textContent=sl.value;onChange(parseFloat(sl.value));};
    sl.ondblclick=()=>{sl.value=String(defaultVal);vl.textContent=String(defaultVal);onChange(defaultVal);};
    return sl;
  }
  mkColorPicker(p,cur,onUpdate){
    const row=p.createEl('div');
    Object.assign(row.style,{display:'flex',alignItems:'center',gap:'10px',margin:'8px 0 10px'});
    const pk=row.createEl('input');
    pk.type='color';pk.value=cur||'#ffffff';
    Object.assign(pk.style,{
      width:'42px',
      height:'34px',
      border:'1px solid color-mix(in srgb, var(--background-modifier-border) 35%, transparent)',
      background:'var(--background-secondary-alt)',
      cursor:'pointer',
      padding:'2px'
    });
    const hi=row.createEl('input');
    hi.type='text';hi.value=cur||'';
    Object.assign(hi.style,{
      flex:'1',
      padding:'7px 8px 6px',
      fontFamily:'"Space Grotesk","Azeret Mono","Noto Sans Mono",monospace',
      fontSize:'11px',
      letterSpacing:'0.05em',
      textTransform:'uppercase',
      background:'var(--background-primary-alt)',
      border:'none',
      borderBottom:'2px solid color-mix(in srgb, var(--background-modifier-border) 60%, transparent)',
      color:'var(--text-normal)'
    });
    const updateColor=c=>{pk.value=c;hi.value=c;onUpdate(c);};
    pk.oninput=()=>updateColor(pk.value);
    hi.onchange=()=>{if(/^#[0-9a-fA-F]{6}$/.test(hi.value.trim()))updateColor(hi.value.trim());};
    return{pk,hi,updateColor};
  }
  mkSelect(p,items,cur,defLabel){
    const sel=p.createEl('select');
    Object.assign(sel.style,{
      width:'100%',
      padding:'7px 8px 6px',
      marginBottom:'6px',
      background:'var(--background-primary-alt)',
      border:'none',
      borderBottom:'2px solid color-mix(in srgb, var(--background-modifier-border) 60%, transparent)',
      color:'var(--text-normal)',
      fontFamily:'"Space Grotesk","Azeret Mono","Noto Sans Mono",monospace',
      fontSize:'11px',
      letterSpacing:'0.05em',
      cursor:'pointer'
    });
    sel.createEl('option',{text:defLabel||'— Default —',value:''});
    items.forEach(f=>{const o=sel.createEl('option',{text:f,value:f});if(f===cur)o.selected=true;});
    if(!cur)sel.value='';
    return sel;
  }
  mkPresetBtn(btn,active){
    Object.assign(btn.style,{
      padding:'5px 9px',
      fontSize:'10px',
      cursor:'pointer',
      background:active?'var(--interactive-accent)':'var(--background-secondary-alt)',
      color:active?'var(--background-primary)':'var(--text-normal)',
      border:'1px solid '+(active?'var(--interactive-accent)':'color-mix(in srgb, var(--background-modifier-border) 25%, transparent)'),
      fontFamily:'"Space Grotesk","Azeret Mono","Noto Sans Mono",monospace',
      letterSpacing:'0.06em',
      textTransform:'uppercase'
    });
  }
  mkResetBtn(p,text,onClick){
    const btn=p.createEl('button',{text});
    Object.assign(btn.style,{
      marginTop:'14px',
      width:'100%',
      padding:'8px 10px',
      cursor:'pointer',
      background:'transparent',
      border:'1px solid color-mix(in srgb, var(--background-modifier-border) 20%, transparent)',
      color:'var(--text-muted)',
      fontFamily:'"Space Grotesk","Azeret Mono","Noto Sans Mono",monospace',
      fontSize:'10px',
      letterSpacing:'0.08em',
      textTransform:'uppercase'
    });
    btn.onclick=onClick;
    return btn;
  }

  async loadSettings(){this.settings=normalizeSettings(await this.loadData());}
  async saveSettings(){await this.saveData(this.settings);}
}

class ToolzerSettingTab extends PluginSettingTab {
  constructor(app,plugin){super(app,plugin);this.plugin=plugin;}
  display(){
    const {containerEl,plugin}=this;const t=plugin.t; containerEl.empty();
    containerEl.style.maxWidth='980px';
    containerEl.style.paddingRight='18px';
    const hero=containerEl.createEl('div');
    hero.style.cssText='margin-bottom:18px;padding:4px 0 10px;border-bottom:1px solid color-mix(in srgb, var(--background-modifier-border) 18%, transparent);';
    hero.createEl('h2',{text:t.settingsTitle}).style.cssText='margin:0 0 6px;font-size:30px;font-weight:800;letter-spacing:-0.03em;';
    hero.createEl('div',{text:'TACTICAL CONFIGURATION MODULE'}).style.cssText='font-size:10px;letter-spacing:.16em;text-transform:uppercase;color:var(--interactive-accent);font-family:"Space Grotesk","Azeret Mono","Noto Sans Mono",monospace;';

    const sectionTitle=(icon,label)=>{
      const row=containerEl.createEl('div');
      row.style.cssText='display:flex;align-items:center;gap:8px;margin:18px 0 10px;';
      row.createEl('span',{text:icon}).style.cssText='color:var(--interactive-accent);font-size:14px;';
      row.createEl('div',{text:label}).style.cssText='font-size:11px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:var(--interactive-accent);font-family:"Space Grotesk","Azeret Mono","Noto Sans Mono",monospace;';
      return row;
    };

    sectionTitle('◉', t.settingsTabsLabel);
    containerEl.createEl('div',{text:t.settingsTabsDesc}).style.cssText='font-size:12px;color:var(--text-muted);margin-bottom:12px;';
    const grid=containerEl.createEl('div');
    grid.style.cssText='display:flex;flex-direction:column;gap:6px;margin-bottom:22px;';
    const order=plugin.settings.tabOrder||ALL_TAB_IDS;
    order.forEach((id, i)=>{
      const wrap=grid.createEl('div');
      wrap.style.cssText='display:flex;align-items:center;background:var(--background-secondary);padding:10px 12px;border-left:2px solid var(--interactive-accent);';
      const cb=wrap.createEl('input',{type:'checkbox',checked:plugin.settings.visibleTabs?.includes(id)});
      cb.onchange=async()=>{plugin.settings.visibleTabs=Array.from(grid.querySelectorAll('input[type=checkbox]')).filter(c=>c.checked).map((c,idx)=>order[idx]); await plugin.saveSettings();};
      cb.style.cssText='margin-right:12px;';
      wrap.createEl('span',{text:t.tabTitles[id], style:'margin:0 10px 0 0;font-size:13px;flex:1'});
      const meta=wrap.createEl('span',{text:`slot ${i+1}`});
      meta.style.cssText='margin-right:12px;font-size:9px;text-transform:uppercase;letter-spacing:.1em;color:var(--text-faint);font-family:"Space Grotesk","Azeret Mono","Noto Sans Mono",monospace;';
      if(i>0){ const up=wrap.createEl('button',{text:'↑', style:'padding:3px 9px;font-size:12px;margin-right:4px;background:var(--background-primary-alt);border:1px solid color-mix(in srgb, var(--background-modifier-border) 25%, transparent);cursor:pointer;'}); up.onclick=async()=>{[order[i-1],order[i]]=[order[i],order[i-1]]; plugin.settings.tabOrder=order; await plugin.saveSettings(); this.display();} }
      if(i<order.length-1){ const down=wrap.createEl('button',{text:'↓', style:'padding:3px 9px;font-size:12px;background:var(--background-primary-alt);border:1px solid color-mix(in srgb, var(--background-modifier-border) 25%, transparent);cursor:pointer;'}); down.onclick=async()=>{[order[i+1],order[i]]=[order[i],order[i+1]]; plugin.settings.tabOrder=order; await plugin.saveSettings(); this.display();} }
    });

    sectionTitle('▣', t.settingsWidthLabel);
    const dimWrap=containerEl.createEl('div');
    dimWrap.style.cssText='background:var(--background-secondary);padding:16px 18px;margin-bottom:22px;';
    dimWrap.createEl('div',{text:t.settingsWidthDesc}).style.cssText='font-size:12px;color:var(--text-muted);margin-bottom:10px;';
    const dimValue=dimWrap.createEl('div',{text:`${plugin.settings.popupWidth||DEFAULTS.popupWidth}px`});
    dimValue.style.cssText='font-size:20px;font-weight:800;color:var(--interactive-accent);margin-bottom:6px;font-family:"Space Grotesk","Azeret Mono","Noto Sans Mono",monospace;';
    new Setting(dimWrap).setName('').setDesc('').addSlider(s=>s.setLimits(560,760,20).setValue(plugin.settings.popupWidth||DEFAULTS.popupWidth).setDynamicTooltip().onChange(async v=>{plugin.settings.popupWidth=v;dimValue.textContent=`${v}px`;await plugin.saveSettings();}));

    sectionTitle('⚠', t.settingsResetLabel);
    const danger=containerEl.createEl('div');
    danger.style.cssText='background:color-mix(in srgb, var(--color-red) 8%, var(--background-secondary));padding:16px 18px;border:1px solid color-mix(in srgb, var(--color-red) 18%, transparent);';
    new Setting(danger).setName(t.settingsResetLabel).setDesc(t.settingsResetDesc).addButton(btn=>btn.setButtonText(t.settingsResetBtn).setWarning().onClick(async()=>{plugin.settings=cloneDefaults();await plugin.saveSettings();plugin.applyAll();this.display();new Notice('✓ Reset to defaults');}));
  }
}

module.exports = ToolzerPlugin;
