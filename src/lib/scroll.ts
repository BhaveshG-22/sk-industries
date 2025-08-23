export const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId)
  if (element) {
    const navbarHeight = 112 // Approximate height of the sticky navbar
    const elementPosition = element.offsetTop - navbarHeight
    
    window.scrollTo({
      top: elementPosition,
      behavior: 'smooth'
    })
  }
}

export const scrollToContact = () => {
  scrollToSection('contact')
}