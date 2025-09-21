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
  const contactSection = document.getElementById('contact')
  if (contactSection) {
    // Contact section exists, scroll to it
    scrollToSection('contact')
  } else {
    // Contact section doesn't exist, redirect to home page with hash
    window.location.href = '/#contact'
  }
}