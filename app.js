const burgerMenu = document.getElementById('burger-menu')
const nav = document.querySelector('nav')
const main = document.querySelector('main')
const lis = [...document.querySelectorAll('nav > ul > li')]
const liLinks = [...document.querySelectorAll('nav > ul > li a')]

let burgerShow = false

const hideBurgerMenu = () => {
  nav.classList.remove('burgerAnimationIn')
  main.classList.remove('blur')

  let timer = window.setTimeout(() => {
    nav.classList.remove('burgerShow')
  }, 400)

  lis.forEach((li) => li.classList.remove('liAnimationIn'))
  burgerShow = false

  console.log('hide burger Menu')
}

burgerMenu.addEventListener('click', (e) => {
  e.preventDefault()

  if (!burgerShow) {
    nav.classList.add('burgerShow')
    main.classList.add('blur')
    let timer = window.setTimeout(
      () => nav.classList.add('burgerAnimationIn'),
      10
    )
    timer = window.setTimeout(() => {
      lis.forEach((li, index) => {
        let subTimer = window.setTimeout(() => {
          li.classList.add('liAnimationIn')
        }, 50 * index)
      })
    }, 100)

    burgerShow = true
  } else hideBurgerMenu()

  // nav.classList.toggle("burgerAnimation")
})

liLinks.forEach((link) =>
  link.addEventListener('click', (e) => {
    hideBurgerMenu()
  })
)

nav.addEventListener('click', (e) => hideBurgerMenu())

// ********************* DEBUT CUSTOM BURGER CLASS *********************

let strToDom = (str) =>
  document.createRange().createContextualFragment(str).firstChild

function easeOutExpo(x) {
  return x === 1 ? 1 : 1 - Math.pow(2, -10 * x)
}

class CustomBurger extends HTMLElement {
  constructor() {
    super()
    const shadow = this.attachShadow({ mode: 'open' })
    const svg = strToDom(`<svg viewBox="0 0 100 100">
        </svg>`)

    this.squarePath1 = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'path'
    )
    this.squarePath1.setAttribute('fill', '#2c5d87')
    this.squarePath1.setAttribute('d', this.squarePath1_draw(0, burgerShow))
    svg.appendChild(this.squarePath1)

    this.squarePath2 = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'path'
    )
    this.squarePath2.setAttribute('fill', '#2c5d87')
    this.squarePath2.setAttribute('d', this.squarePath2_draw(0, burgerShow))
    svg.appendChild(this.squarePath2)

    this.squarePath3 = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'path'
    )
    this.squarePath3.setAttribute('fill', '#2c5d87')
    this.squarePath3.setAttribute('d', this.squarePath3_draw(0, burgerShow))
    svg.appendChild(this.squarePath3)

    this.burgerPath1 = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'path'
    )
    this.burgerPath1.setAttribute('style', this.burgerPath_style(0, burgerShow))
    this.burgerPath1.setAttribute('d', this.burgerPath1_draw(0, burgerShow))
    svg.appendChild(this.burgerPath1)

    this.burgerPath2 = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'path'
    )
    this.burgerPath2.setAttribute('style', this.burgerPath_style(0, burgerShow))
    this.burgerPath2.setAttribute('d', this.burgerPath2_draw(0, burgerShow))
    svg.appendChild(this.burgerPath2)

    this.burgerPath3 = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'path'
    )
    this.burgerPath3.setAttribute('style', this.burgerPath_style(0, burgerShow))
    this.burgerPath3.setAttribute('d', this.burgerPath3_draw(0, burgerShow))
    svg.appendChild(this.burgerPath3)

    const style = document.createElement('style')
    style.innerHTML = `
            :host{
                display:block;
                position:relative;
            }
            svg{
                height:calc(0.8 * var(--header-height));
            }
            path{
                cursor:pointer;
            }
        `

    svg.addEventListener('click', (e) => {
      this.animateBurger(burgerShow)
    })

    nav.addEventListener('click', (e) => {
      this.animateBurger(!burgerShow)
    })

    liLinks.forEach((link) =>
      link.addEventListener('click', (e) => {
        this.animateBurger(!burgerShow)
      })
    )

    shadow.appendChild(style)
    shadow.appendChild(svg)
  }

  burgerPath_style(time, reverse) {
    let strokeWidthMin = 5
    let strokeWidthMax = 15

    if ((time > 0.5 && reverse) || (time < 0.5 && !reverse)) {
      if (!reverse) time = time * 2
      else time = (time - 0.5) * 2

      const strokeWidth = !reverse
        ? strokeWidthMax - time * (strokeWidthMax - strokeWidthMin)
        : strokeWidthMin + time * (strokeWidthMax - strokeWidthMin)

      return `fill:none;
        stroke:#2c5d87;
        stroke-width:${strokeWidth};
        stroke-linecap:round;
        stroke-linejoin:miter;
        stroke-miterlimit:4;
        stroke-opacity:1;
        stroke-dasharray:none
        ` // stroke:#2c5d87;
    } else return ''
  }

  calcVal(
    reverse,
    time,
    val1start = 0,
    val1end = 0,
    val2start = 0,
    val2end = 0,
    val3start = 0,
    val3end = 0,
    val4start = 0,
    val4end = 0
  ) {
    const val1 = !reverse
      ? val1end - time * (val1end - val1start)
      : val1start + time * (val1end - val1start)
    const val2 = !reverse
      ? val2end - time * (val2end - val2start)
      : val2start + time * (val2end - val2start)
    const val3 = !reverse
      ? val3end - time * (val3end - val3start)
      : val3start + time * (val3end - val3start)
    const val4 = !reverse
      ? val4end - time * (val4end - val4start)
      : val4start + time * (val4end - val4start)

    return [val1, val2, val3, val4]
  }

  burgerPath1_draw(time, reverse) {
    if ((time > 0.5 && !reverse) || (time < 0.5 && reverse)) {
      return ``
    } else {
      const val1start = 6 // 6 > 6
      const val1end = 6
      const val2start = 23 // 23 > 10
      const val2end = 20
      const val3start = 84 // 84 > 84
      const val3end = 84
      const val4start = 23 // 23 > 10
      const val4end = 20

      if (!reverse) time = time * 2
      else time = (time - 0.5) * 2

      const [val1, val2, val3, val4] = this.calcVal(
        reverse,
        time,
        val1start,
        val1end,
        val2start,
        val2end,
        val3start,
        val3end,
        val4start,
        val4end
      )

      return `M${val1},${val2} ${val3},${val4}`
    }
  }

  burgerPath2_draw(time, reverse) {
    if ((time > 0.5 && !reverse) || (time < 0.5 && reverse)) {
      return ``
    } else {
      // end = burger mode
      const val1start = 4.2 // 6 > 6
      const val1end = 6
      const val2start = 28.8 // 23 > 10
      const val2end = 50
      const val3start = 39.3 // 84 > 84
      const val3end = 84
      const val4start = 99.2 // 23 > 10
      const val4end = 50

      if (!reverse) time = time * 2
      else time = (time - 0.5) * 2

      const [val1, val2, val3, val4] = this.calcVal(
        reverse,
        time,
        val1start,
        val1end,
        val2start,
        val2end,
        val3start,
        val3end,
        val4start,
        val4end
      )

      return `M${val1},${val2} ${val3},${val4}`
    }
  }

  burgerPath3_draw(time, reverse) {
    if ((time > 0.5 && !reverse) || (time < 0.5 && reverse)) {
      return ``
    } else {
      // end = burger mode
      const val1start = 46.5 // 6 > 6
      const val1end = 6
      const val2start = 97.2 // 23 > 10
      const val2end = 80
      const val3start = 90.3 // 84 > 84
      const val3end = 84
      const val4start = 30.2 // 23 > 10
      const val4end = 80

      if (!reverse) time = time * 2
      else time = (time - 0.5) * 2

      const [val1, val2, val3, val4] = this.calcVal(
        reverse,
        time,
        val1start,
        val1end,
        val2start,
        val2end,
        val3start,
        val3end,
        val4start,
        val4end
      )

      return `M${val1},${val2} ${val3},${val4}`
    }
  }

  squarePath1_draw(time, reverse) {
    if ((time > 0.5 && reverse) || (time < 0.5 && !reverse)) {
      return ``
    } else {
      const val1start = 21.4 // 21.4 >> 0.7
      const val1end = 0.7
      const val2start = 25.4 // 25.4 >> 46.4
      const val2end = 46.4
      const val3start = 0 // 0 >> -20.8
      const val3end = -20.8

      if (reverse) time = time * 2
      else time = (time - 0.5) * 2

      const [val1, val2, val3, val4] = this.calcVal(
        !reverse,
        time,
        val1start,
        val1end,
        val2start,
        val2end,
        val3start,
        val3end
      )

      return `M41.3,${val2} c2,1.1,5.2,1.1,7.1,0
    l35.9 ${val3} c2-1.1,2-3,0-4.1
    L48.5,${val1} c-2-1.1-5.2-1.1-7.2,0
    L5.4,21.4 c-2,1.1-2,3,0,4.1
    L41.3,${val2}
    z`
    }
  }

  squarePath2_draw(time, reverse) {
    if ((time > 0.5 && reverse) || (time < 0.5 && !reverse)) {
      return ``
    } else {
      const val1start = 23.8 // 23.8 >> 43.2
      const val1end = 43.2 // 23.8 >> 43.2
      const val2start = 62.5 // 62.5 >> 55.7
      const val2end = 55.7 // 62.5 >> 55.7
      const val3start = 16.8 // 16.8 >> 0.3
      const val3end = 0.3 // 16.8 >> 0.3
      const val4start = 58 // 58 >> 72.2
      const val4end = 72.2 // 58 >> 72.2

      if (reverse) time = time * 2
      else time = (time - 0.5) * 2

      const [val1, val2, val3, val4] = this.calcVal(
        !reverse,
        time,
        val1start,
        val1end,
        val2start,
        val2end,
        val3start,
        val3end,
        val4start,
        val4end
      )

      return `M${val1},${val2} c0-2.3-1.6-5.1-3.6-6.2
    L4.2,28.8 c-2-1.1-3.6-0.2-3.6,2.1
    L${val3},${val4} c0,2.3,1.6,5.1,3.6,6.2
    L39.3,99.2 c2,1.1,3.6,0.2,3.6-2.1
    L${val1},${val2}
    z`
    }
  }

  squarePath3_draw(time, reverse) {
    if ((time > 0.5 && reverse) || (time < 0.5 && !reverse)) {
      return ``
    } else {
      const val1start = 69.2 // 23.8 >> 43.2
      const val1end = 50.2 // 23.8 >> 43.2
      const val2start = 57.5 // 62.5 >> 55.7
      const val2end = 49.5 // 62.5 >> 55.7
      const val3start = 69.3 // 16.8 >> 0.3
      const val3end = 86.3 // 16.8 >> 0.3
      const val4start = 66 // 58 >> 72.2
      const val4end = 78 // 58 >> 72.2

      if (reverse) time = time * 2
      else time = (time - 0.5) * 2

      const [val1, val2, val3, val4] = this.calcVal(
        !reverse,
        time,
        val1start,
        val1end,
        val2start,
        val2end,
        val3start,
        val3end,
        val4start,
        val4end
      )

      return `M${val1},${val2} c-2,1.1-3.6,3.9-3.6,6.2
    L46.5,97.2 c0,2.3,1.6,3.2,3.6,2.1
    L${val3},${val4} c2-1.1,3.6-3.9,3.6-6.2
    L90.3,30.2 c0-2.3-1.6-3.2-3.6-2.1
    L${val1},${val2}
    z`
    }
  }

  animateBurger(reverse) {
    const now = Date.now()
    const duration = 2000

    const drawCallback = () => {
      let t = (Date.now() - now) / duration

      if (t < 1) {
        this.draw(easeOutExpo(t), reverse)
        window.requestAnimationFrame(drawCallback)
      } else {
        this.draw(1, reverse)
      }
    }
    window.requestAnimationFrame(drawCallback)
  }

  draw(progress = 1, reverse = false) {
    this.burgerPath1.setAttribute(
      'style',
      this.burgerPath_style(progress, reverse)
    )
    this.burgerPath1.setAttribute('d', this.burgerPath1_draw(progress, reverse))
    this.burgerPath2.setAttribute(
      'style',
      this.burgerPath_style(progress, reverse)
    )
    this.burgerPath2.setAttribute('d', this.burgerPath2_draw(progress, reverse))
    this.burgerPath3.setAttribute(
      'style',
      this.burgerPath_style(progress, reverse)
    )
    this.burgerPath3.setAttribute('d', this.burgerPath3_draw(progress, reverse))

    this.squarePath1.setAttribute('d', this.squarePath1_draw(progress, reverse))
    this.squarePath2.setAttribute('d', this.squarePath2_draw(progress, reverse))
    this.squarePath3.setAttribute('d', this.squarePath3_draw(progress, reverse))
  }
}

customElements.define('custom-burger', CustomBurger)

// ********************* FIN CUSTOM BURGER CLASS *********************

const titleDiv = document.querySelector('header > .header-container > div')
const titleH1 = document.querySelector('header > .header-container > div > h1')

const title = titleH1.innerText
const rawWords = title.split(' ')
const words = rawWords.map((word) => [...word])

titleDiv.removeChild(titleH1)

let delay = 0

words.forEach((word) => {
  const wordDiv = document.createElement('div')

  word.forEach((letter, letterIndex) => {
    let subTimer = window.setTimeout(() => {
      const letterDiv = document.createElement('div')
      letterDiv.classList.add('intro')
      let subTimer = window.setTimeout(
        () => letterDiv.classList.remove('intro'),
        10
      )
      const subLetterDiv = document.createElement('div')
      subLetterDiv.innerText = letter
      letterDiv.appendChild(subLetterDiv)
      wordDiv.appendChild(letterDiv)
    }, delay * 140)

    delay++
  })

  titleDiv.appendChild(wordDiv)
})

// Animations box-img
const imgOverlay = document.querySelectorAll('.img-overlay')
const boxImg = document.querySelectorAll('.box')

imgOverlay.forEach((img, index) => {
  img.addEventListener('mouseover', function () {
    boxImg[index].classList.add('box-hover')
  })
  img.addEventListener('mouseleave', function () {
    boxImg[index].classList.remove('box-hover')
  })
})

// ********************* DEBUT DOM PRESENTATION DETAILLEE *********************

const presentationTable = [
  {
    firstName: 'ANTHONY',
    lastName: 'AUBERT',
    id: 'antho',
    jobTitle: '??tudiant d??veloppeur full-stack JS',
    githubLink: 'https://github.com/Antho-37',
    facebookLink: '',
    linkedinLink: 'https://www.linkedin.com/in/anthony-aubert-994927176/',
    twitterLink: '',
    profilePictureUrl: 'img/anthony.png',
    presentationText: `Passionn?? par le web et curieux des nouvelles technologies, je suis sorti dipl??m?? de la formation Designer Web du CEFIM en 2018.<br><br>Lors de ma derni??re exp??rience professionnelle, j'ai effectu?? plusieurs travaux d'int??gration de sites web et je souhaite d??sormais acqu??rir des comp??tences en d??veloppement web autour autour du langage JavaScript (ReactJS / NodeJs).<br><br>Mon projet est d'int??grer une agence qui me permettrait de gagner en exp??rience et d'enrichir mes connaissances avant de me lancer en freelance.`,
  },

  {
    firstName: 'EMMA',
    lastName: 'BIGNON',
    id: 'emma',
    jobTitle: '??tudiante d??veloppeuse full-stack JS',
    githubLink: 'https://github.com/BignonEmma',
    facebookLink: '',
    linkedinLink: '',
    twitterLink: '',
    profilePictureUrl: 'img/emma.png',
    presentationText: `??tudiante de 21 ans, divers milieux m'int??ressent tels que le domaine culinaire, l???environnement animalier ou encore le graphisme. Ayant toujours eu une affinit?? avec le monde de la tech, mon choix s'est finalement port?? sur le web development.<br><br> Je suis actuellement une formation me permettant de devenir d??veloppeur full-stack, ayant toutefois une petite pr??f??rence pour le c??t?? front-end ainsi que l???UI/UX.`,
  },

  {
    firstName: 'JULIEN',
    lastName: 'VIGNERON',
    id: 'julien',
    jobTitle: '??tudiant d??veloppeur full-stack JS',
    githubLink: 'https://github.com/gnos28',
    facebookLink: 'https://www.facebook.com/gnos28/',
    linkedinLink: 'https://www.linkedin.com/in/julienvigneron/',
    twitterLink: '',
    profilePictureUrl: 'img/julien.png',
    presentationText:
      "Fort de 10 ann??es d'exp??rience au sein d'un service ressources humaines, je suis ?? m??me de comprendre vos probl??matiques, analyser vos processus et ??tre force de proposition pour fluidifier votre gestion administrative.<br><br>L'exp??rience utilisateur et la satisfaction client sont mes priorit??s.<br><br>Mon ambition sur 2022 est d'??largir mon champ de comp??tences autour du javascript en acqu??rant la maitrise des frameworks react / react native et de la plateforme backend NodeJS afin de vous proposer ?? terme un ??cosyst??me digital complet (administration + visibilit?? + mobilit??) et parfaitement adapt?? ?? vos besoins.",
  },

  {
    firstName: 'LORA',
    lastName: 'PERRICHON',
    id: 'lora',
    jobTitle: '??tudiante d??veloppeuse full-stack JS',
    githubLink: 'https://github.com/Lora048',
    facebookLink: '',
    linkedinLink: 'https://www.linkedin.com/in/lora-perrichon-237000138/',
    twitterLink: '',
    profilePictureUrl: 'img/lora.png',
    presentationText: `Apr??s quelques ann??es en tant que psychologue du travail, je me r??oriente actuellement vers le m??tier de d??veloppeur web fullstack JS.<br><br> 
    Mon objectif est d???acqu??rir des bases solides afin de pouvoir intervenir sur les diff??rentes phases de production d???un projet. Int??ress??e par le front et le back-end, mes trois ann??es en qualit?? de psychologue du travail m???ont ??galement permis de d??velopper une app??tence pour l???UI/UX design. 
    `,
  },

  {
    firstName: 'ALEXANDRE',
    lastName: 'PILLIAS',
    id: 'alex',
    jobTitle: '??tudiant d??veloppeur full-stack JS',
    githubLink: 'https://github.com/kaitolight',
    facebookLink: '',
    linkedinLink: 'https://www.linkedin.com/in/alexandre-pillias-ab3415234/',
    twitterLink: '',
    profilePictureUrl: 'img/alexandre.png',
    presentationText:
      "Ayant eu une br??ve exp??rience avec le HTML et CSS ??tant plus jeune, j'ai choisis de faire cette formation pour consolider mes acquis dans ces derniers et d??couvrir un tout nouveau langage qu'est le Javascript.<br><br>J'ai eu la chance de faire une licence d'anglais et d'??tre en totale immersion pendant 8 mois en Angleterre, je suis ?? m??me ?? comprendre et parler l'anglais couramment.<br><br>J'ai pour ambition d'??largir mes champs de comp??tences et d'obtenir l'exp??rience professionnelle qui me manque. Mon projet final est de m'installer ?? l'??tranger, dans un pays anglophone, et y faire ma vie.",
  },
]

presentationTable.forEach((person, personIndex) => {
  const teamGoing = document.createElement('div')
  teamGoing.classList.add('team-going')
  teamGoing.classList.add('reveal-light-hidden')

  for (let i = 0; i < presentationTable.length; i++) {
    if (i != personIndex) {
      const aTeamGoing = document.createElement('a')
      aTeamGoing.href = '#' + presentationTable[i].id
      const imgTeamGoing = document.createElement('img')
      imgTeamGoing.src = presentationTable[i].profilePictureUrl
      imgTeamGoing.alt = presentationTable[i].firstName
      imgTeamGoing.classList.add('team-photo')

      aTeamGoing.appendChild(imgTeamGoing)

      teamGoing.appendChild(aTeamGoing)
    }
  }

  const section = document.createElement('section')
  section.classList.add('about')

  const ancre = document.createElement('div')
  ancre.classList.add('ancre')
  ancre.id = person.id

  const container = document.createElement('div')
  container.classList.add('container')

  const detailedPresentation = document.createElement('div')
  detailedPresentation.classList.add('detailed-presentation')
  detailedPresentation.classList.add('reveal')

  const flexTitle = document.createElement('div')
  flexTitle.classList.add('flex-title')

  const titleH2 = document.createElement('h2')
  titleH2.innerText = person.firstName + ' ' + person.lastName

  const jobTitle = document.createElement('h3')
  jobTitle.innerText = person.jobTitle

  const pictoContainerDesktop = document.createElement('div')
  pictoContainerDesktop.classList.add('presentation-picto')

  const pictList = [
    { imgUrl: 'img/github.png', socialLink: person.githubLink },
    { imgUrl: 'img/linkedin.png', socialLink: person.linkedinLink },
    { imgUrl: 'img/twitter.png', socialLink: person.twitterLink },
    { imgUrl: 'img/facebook.png', socialLink: person.facebookLink },
  ]

  pictList.forEach((picto) => {
    const pictoLink = document.createElement('a')
    if (picto.socialLink.length) pictoLink.href = picto.socialLink
    pictoLink.target = '_blank'
    const alt = picto.imgUrl.split('/')[1].split('.')[0]
    const pictoImg = document.createElement('img')
    pictoImg.src = picto.imgUrl
    pictoImg.alt = alt
    if (!picto.socialLink.length) pictoImg.classList.add('noSocialNetwork')
    pictoLink.appendChild(pictoImg)

    pictoContainerDesktop.appendChild(pictoLink)
  })

  pictoContainerMobile = pictoContainerDesktop.cloneNode(true)

  pictoContainerDesktop.classList.add('presentation-picto-desktop')
  pictoContainerMobile.classList.add('presentation-picto-mobile')

  const profilePicto = document.createElement('div')
  profilePicto.classList.add('profile-picto')

  const presentationImg = document.createElement('div')
  presentationImg.classList.add('presentation-img')

  const easyPhoto = document.createElement('img')
  easyPhoto.classList.add('easy-photo')
  easyPhoto.alt = person.firstName
  easyPhoto.src = person.profilePictureUrl

  const presText = document.createElement('div')
  presText.classList.add('presentation-text')
  presText.classList.add('reveal-light-hidden')
  presText.innerHTML = person.presentationText

  // const teamGoing =

  section.appendChild(ancre)
  section.appendChild(container)

  container.appendChild(detailedPresentation)
  detailedPresentation.appendChild(flexTitle)

  detailedPresentation.appendChild(profilePicto)

  flexTitle.appendChild(titleH2)
  flexTitle.appendChild(jobTitle)
  flexTitle.appendChild(pictoContainerDesktop)

  profilePicto.appendChild(presentationImg)
  profilePicto.appendChild(pictoContainerMobile)

  presentationImg.appendChild(easyPhoto)

  container.appendChild(presText)

  container.appendChild(teamGoing)

  if (personIndex < presentationTable.length - 1)
  {
    const divContainerChevron = document.createElement('div')
    const aChevron = document.createElement('a')
    const imgChevron = document.createElement('img')

    divContainerChevron.classList.add('container-chevron')
    aChevron.href = '#' + presentationTable[personIndex + 1].id
    imgChevron.src = "img/chevrons.png"

    aChevron.appendChild(imgChevron)
    divContainerChevron.appendChild(aChevron)
    section.appendChild(divContainerChevron)
  }

  main.appendChild(section) // penser ?? rajouter les chevrons
})

// ********************* DEBUT INTERSECTION OBSERVER *********************

// chopper largeur viewport
let viewWidth = window.innerWidth
let baseSquareSize = Math.floor(window.innerWidth * 0.055)
if (baseSquareSize > 88) baseSquareSize = 88
if (baseSquareSize < 19) baseSquareSize = 19
let observer

const addReveal = (firstLoad = false) => {
  // console.log('addReveal', firstLoad)
  // cr??ation des quadrillages
  const reveals = document.querySelectorAll('.reveal')
  const revealLight = document.querySelectorAll('.reveal-light-hidden')

  if (firstLoad) observer = new IntersectionObserver(handleIntersect, options)

  reveals.forEach((reveal) => {
    // console.log("************* reveal.target", reveal)
    // console.log("reveal.isLoaded", reveal.isLoaded)
    // console.log("jquery height()",$(reveal).height())
    // console.log("jquery outerHeight()",$(reveal).outerHeight())
    // console.log("reveal.clientHeight",reveal.clientHeight)
    // console.log("reveal.scrollHeight",reveal.scrollHeight)
    // console.log("reveal.getBoundingClientRect()",reveal.getBoundingClientRect())
    // console.log("getComputedStyle(reveal).height",getComputedStyle(reveal).height)
    // console.log("getComputedStyle(reveal).webkitLogicalHeight", getComputedStyle(reveal).webkitLogicalHeight)
    // console.log("-+-+-", reveal.getClientRects())

    if (firstLoad) reveal.isLoaded = false
    // ?? passer ?? true une fois l'animation jou??e
    else {
      // effacer pr??cedentes div children
      reveal
        .querySelectorAll('.reveal-block')
        .forEach((element) => element.remove())
    }

    if (!reveal.isLoaded) {
      const elementWidth = $(reveal).width() //reveal.offsetWidth
      const elementHeight = $(reveal).height() //reveal.offsetHeight

      let nbSquareWidth = Math.ceil(elementWidth / baseSquareSize)
      let nbSquareHeight = Math.ceil(elementHeight / baseSquareSize)
      // console.log(
      //   'elementHeight / baseSquareSize',
      //   elementHeight / baseSquareSize
      // )

      const moduloSquareWidth = elementWidth % nbSquareWidth
      const moduloSquareHeight = elementHeight % nbSquareHeight

      let finalSquareWidth = elementWidth / nbSquareWidth
      let finalSquareHeight = elementHeight / nbSquareHeight
      if (finalSquareWidth > finalSquareHeight) {
        finalSquareWidth = finalSquareHeight
        nbSquareWidth = elementWidth / finalSquareWidth
      } else {
        finalSquareHeight = finalSquareWidth
        nbSquareHeight = elementHeight / finalSquareHeight
      }

      reveal.tinySquares = []

      for (let i = 0; i <= nbSquareHeight; i++) {
        const tinyRow = []
        for (let j = 0; j <= nbSquareWidth; j++) {
          const tinySquare = document.createElement('div')
          tinySquare.classList.add('reveal-block')
          tinySquare.style.height = Math.ceil(finalSquareHeight) + 'px'
          tinySquare.style.width = Math.ceil(finalSquareWidth) + 'px'
          tinySquare.style.top = i * finalSquareHeight + 'px'
          tinySquare.style.left = j * finalSquareWidth + 'px'
          reveal.appendChild(tinySquare)
          tinyRow.push(tinySquare)
        }
        reveal.tinySquares.push(tinyRow)
        // console.log("boloss",reveal.tinySquares)
      }
    }
    // console.log("observe reveal", observer)
    observer.observe(reveal)
  })

  revealLight.forEach((reveal) => {
    // console.log('observe reveal light', observer)
    observer.observe(reveal)
  })
}

const threshold = 0.1
const options = {
  root: null,
  rootMargin: '0px',
  threshold: 0.5,
}

const handleIntersect = function (reveals, observer) {
  reveals.forEach(function (reveal) {
    if (reveal.intersectionRatio > threshold) {
      // console.log([...reveal.target.classList])
      if ([...reveal.target.classList].includes('reveal-light-hidden')) {
        reveal.target.classList.remove('reveal-light-hidden')
        reveal.target.classList.add('reveal-light')
      } else {
        if (!reveal.isLoaded) {
          // console.log('reveal.target', reveal.target)
          // console.log('reveal.target.tinySquares', reveal.target.tinySquares)
          const xLength = reveal.target.tinySquares.length
          const yLength = reveal.target.tinySquares[0].length

          const totalLength = xLength + yLength
          // console.log("reveal.target.tinySquares", reveal.target.tinySquares)
          // console.log("totalLength",totalLength)

          for (let i = 0; i < totalLength; i++) {
            // console.log("i", i)
            for (let x = i; x >= 0; x--) {
              // console.log(x, i-x)

              //if(reveal.target.tinySquares[x][i-x] !== undefined)

              if (
                x < reveal.target.tinySquares.length &&
                i - x < reveal.target.tinySquares[0].length
              )
                window.setTimeout(() => {
                  // console.log('inside timeout', reveal.target.tinySquares)
                  if (
                    x < reveal.target.tinySquares.length &&
                    i - x < reveal.target.tinySquares[0].length
                  ) {
                    reveal.target.tinySquares[x][i - x].classList.add(
                      'reveal-animate'
                    )
                    window.setTimeout(() => {
                      if (
                        x < reveal.target.tinySquares.length &&
                        i - x < reveal.target.tinySquares[0].length
                      ) {
                        reveal.target.tinySquares[x][i - x].remove()
                      }
                    }, 1000)
                  }
                }, i * 100)
            }
          }
        }
      }
      // console.log("reveal.isLoaded = true", reveal.target)
      reveal.target.isLoaded = true
      observer.unobserve(reveal.target)
    }
  })
}

window.addEventListener('resize', (e) => {
  viewWidth = window.innerWidth
  baseSquareSize = Math.floor(window.innerWidth * 0.055)
  if (baseSquareSize > 88) baseSquareSize = 88
  if (baseSquareSize < 19) baseSquareSize = 19
  addReveal()
})

$(document).ready(addReveal(true))
//console.log(words)
