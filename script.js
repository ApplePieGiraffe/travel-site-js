let controller;
let sectionScene;
let pageScene;

function animateSection() {
    controller = new ScrollMagic.Controller();
    let header = document.querySelector('.header');
    let sections = document.querySelectorAll('.section');
    sections.forEach((section, index, sections) => {
        // selectors
        let sectionImg = section.querySelector('.section__img');
        let imgReveal = section.querySelector('.img-reveal-block');
        let textReveal = section.querySelector('.text-reveal-block');

        // gsap animations
        let sectionTl = gsap.timeline({
            defaults: { duration: 1, ease: 'power2.inOut' },
        });

        sectionTl.fromTo(imgReveal, { x: '0%' }, { x: '100%' });
        sectionTl.fromTo(sectionImg, { scale: 2 }, { scale: 1 }, '-=1');

        sectionTl.fromTo(textReveal, { x: '0%' }, { x: '100%' }, '-=.75');

        sectionTl.fromTo(header, { y: '-100%' }, { y: '0%' }, '-=1');

        // scrollmagic
        sectionScene = new ScrollMagic.Scene({
            triggerElement: section,
            triggerHook: 0.25,
            reverse: false,
        })
            .setTween(sectionTl)
            // .addIndicators({
            //     colorStart: 'lightblue',
            //     colorTrigger: 'lightcoral',
            // })
            .addTo(controller);

        // more gsap and scrollmagic
        let pageTl = gsap.timeline();

        let nextSection = index === sections.length - 1 ? 'end' : sections[index + 1];

        pageTl.fromTo(nextSection, { y: '0%' }, { y: '50%' });
        
        pageTl.fromTo(
            section,
            { opacity: 1, scale: 1 },
            { opacity: 0, scale: 0.5 },
        );

        pageTl.fromTo(nextSection, { y: '50%' }, { y: '0%' });

        pageScene = new ScrollMagic.Scene({
            triggerElement: section,
            duration: '100%',
            triggerHook: 0,
        })
            .setPin(section, { pushFollowers: false })
            .setTween(pageTl)
            // .addIndicators({
            //     colorStart: 'lightblue',
            //     colorTrigger: 'lightcoral',
            //     indent: 200,
            //     name: 'page',
            // })
            .addTo(controller);
    });
}

animateSection();
