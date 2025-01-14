document.addEventListener("DOMContentLoaded", function () {
    const cartWrapper = document.querySelector('.mini-cart_items'); // Cart items wrapper
    const upsellSectionMobile = document.querySelector('.mini-cart_upsells'); // Mobile/tablet upsell section
    const upsellSectionDesktop = document.querySelector('.mini-cart_dropdowm-upsells'); // Desktop upsell section
  
    // Common function to check if the cart contains products
    function cartHasProducts() {
      const cartItems = cartWrapper.querySelectorAll('.cart-item');
      return Array.from(cartItems).some(item => 
        !item.textContent.toLowerCase().includes("shipping")
      );
    }
  
    // Function to handle upsell visibility
    function updateUpsellVisibility() {
      const isMobile = window.matchMedia("(max-width: 1023px)").matches;
      const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
      const hasProducts = cartHasProducts();
  
      if (upsellSectionMobile) {
        upsellSectionMobile.style.display = isMobile && hasProducts ? "block" : "none";
      }
  
      if (upsellSectionDesktop) {
        upsellSectionDesktop.style.display = isDesktop && hasProducts ? "block" : "none";
      }
    }
  
    // Observe cart changes and trigger updates
    const observer = new MutationObserver(updateUpsellVisibility);
    if (cartWrapper) {
      observer.observe(cartWrapper, { childList: true, subtree: true });
    }
  
    // Add resize listener
    window.addEventListener("resize", updateUpsellVisibility);
  
    // Initial check
    updateUpsellVisibility();
  });