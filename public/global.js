// FUNCTION: Cart Upsells
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

// FUNCTION: Stop body scrolling when cart is open
const cartBtn = document.getElementById("cart-btn")
const cartOverlay = document.getElementById("cart-overlay")
const cartCloseBtn = document.getElementById("mini-cart-close")
const openSearch = document.getElementById("open-search")
const closeSearch = document.getElementById("close-search")

function setOverflow() {
  document.body.style.overflow = "hidden"
}

function removeOverflow() {
  document.body.style.overflow = "visible"
}
  
  
cartBtn.addEventListener("click", setOverflow)  
openSearch.addEventListener("click", setOverflow)    
  
cartOverlay.addEventListener("click", removeOverflow) 
  
cartCloseBtn.addEventListener("click", function(){
	
  document.body.removeAttribute('style')
}) 
  
closeSearch.addEventListener("click", removeOverflow) 
  
// FUNCTION: Cart Body Stop Scroll
  document.addEventListener('DOMContentLoaded', () => {
    const dropdownBackground = document.querySelector('.mini-cart_dropdown-background');
    const body = document.body;

    if (dropdownBackground) {
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.attributeName === 'style') {
                    const display = window.getComputedStyle(dropdownBackground).display;
                    if (display === 'block') {
                        body.classList.add('no-scroll');
                    } else {
                        body.classList.remove('no-scroll');
                    }
                }
            });
        });

        observer.observe(dropdownBackground, { attributes: true, attributeFilter: ['style'] });
    } else {
        console.error('.mini-cart_dropdown-background not found');
    }

    document.head.insertAdjacentHTML('beforeend', `
      <style>
        .no-scroll {
            overflow: hidden;
        }
      </style>
    `);
});

// FUNCTION: Free Shipping Bar
document.addEventListener('DOMContentLoaded', () => {
    const freeShippingThreshold = 100; // Free shipping threshold set to 100
    const freeShippingMessage = document.querySelector('.free-shipping_message');
    const freeShippingSuccess = document.querySelector('.free-shipping_success');
    const freeShippingText = document.querySelector('.free-shipping-text');
    const amountRemainingElement = document.querySelector('.amount-remaining');
    const freeShippingBarRemaining = document.querySelector('.free-shipping_bar-remaining');
    const freeShippingAmountElement = document.querySelector('#free-shipping-amount');

    // Function to update free shipping info
    const updateFreeShippingInfo = (cartTotalAmount) => {
        const amountRemaining = freeShippingThreshold - cartTotalAmount; // Calculate amount left for free shipping
        let percentage = (cartTotalAmount / freeShippingThreshold) * 100;
        if (percentage > 100) percentage = 100; // Ensure width does not exceed 100%

        if (cartTotalAmount >= freeShippingThreshold) {
            if (freeShippingMessage) freeShippingMessage.style.display = 'none';
            if (freeShippingSuccess) freeShippingSuccess.style.display = 'block';
            if (freeShippingText) freeShippingText.innerText = 'FREE';
        } else {
            if (freeShippingMessage) freeShippingMessage.style.display = 'block';
            if (freeShippingSuccess) freeShippingSuccess.style.display = 'none';
            if (freeShippingText) freeShippingText.innerText = 'Calculated in Cart';
            if (amountRemainingElement) amountRemainingElement.innerText = `$${amountRemaining.toFixed(2)}`;
        }

        if (freeShippingBarRemaining) {
            freeShippingBarRemaining.style.width = `${percentage}%`;
        }

        // Update the amount remaining for free shipping
        if (freeShippingAmountElement) {
            freeShippingAmountElement.textContent = `$${amountRemaining.toFixed(2)}`;
        }
    };

    // Event listener for smootify:cart_updated event
    document.addEventListener('smootify:cart_updated', (event) => {
        const cart = event.detail;
        const cartTotalAmount = parseFloat(cart.cost.totalAmount.amount); // Ensure the amount is a number
        updateFreeShippingInfo(cartTotalAmount);
    });

    // Mutation Observer for cart total changes
    const targetNode = document.querySelector("#total");
    const callback = function (mutationsList) {
        for (let mutation of mutationsList) {
            if (mutation.type === "childList" || mutation.type === "characterData") {
                const cartTotalAmount = parseFloat(targetNode.textContent.split("$")[1].trim());
                updateFreeShippingInfo(cartTotalAmount);
            }
        }
    };
    const observer = new MutationObserver(callback);
    observer.observe(targetNode, {
        childList: true,
        characterData: true,
        subtree: true,
    });

    // Initialize with current cart total
    if (targetNode) {
        const cartTotalAmount = parseFloat(targetNode.textContent.split("$")[1].trim());
        updateFreeShippingInfo(cartTotalAmount);
    }
});

// FUNCTION: Open Description Dropdown Tab
document.addEventListener("DOMContentLoaded", function() {
  // Select the first dropdown accordion and open it
  const firstDropdown = document.querySelector('.product-dropdown_question');
  if (firstDropdown) {
    firstDropdown.classList.add('w--open'); // Assuming 'w--open' is the class used for the open state
  }
});

// FUNCTION: Filtering
document.addEventListener("DOMContentLoaded", function() {
    // Select the elements based on their class names
    var effectField = document.querySelector('.effect-field');
    var phenotypeField = document.querySelector('.phenotype-field');
    var cbdField = document.querySelector('.cbd-field');
    var cbgField = document.querySelector('.cbg-field');
    var thcField = document.querySelector('.thc-field');
    var badgeDiv = document.querySelector('.js-badge');

    // Check if any field has content
    if (
        (effectField && effectField.textContent.trim().length > 0) ||
        (phenotypeField && phenotypeField.textContent.trim().length > 0) ||
        (cbdField && cbdField.textContent.trim().length > 0) ||
        (cbgField && cbgField.textContent.trim().length > 0) ||
        (thcField && thcField.textContent.trim().length > 0)
    ) {
        badgeDiv.style.display = 'block';  // Show the div if any field is set
    } else {
        badgeDiv.style.display = 'none';  // Hide the div if no fields are set
    }
});

document.addEventListener("DOMContentLoaded", function () {
  // Create a set to store unique effects
  const effects = new Set();

  // Select all the elements that contain the "Effect" values (from hidden CMS Collection List)
  const effectElements = document.querySelectorAll('.hidden-effect-element'); // Adjust this selector to match your hidden CMS item element

  // Loop through each element and add its value to the set (to ensure uniqueness)
  effectElements.forEach(element => {
    const effect = element.textContent.trim(); // Get the text content of the element
    if (effect) {
      effects.add(effect); // Add the effect to the set
    }
  });

  // Select the container where you want to dynamically add the checkboxes
  const filterContainer = document.querySelector('.filter-container'); // Adjust this selector to match your container for checkboxes

  // Create a checkbox for each unique effect
  effects.forEach(effect => {
    const label = document.createElement('label');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.setAttribute('data-effect', effect); // Add data attribute for filtering
    label.appendChild(checkbox);
    label.appendChild(document.createTextNode(' ' + effect)); // Add effect name as label text
    filterContainer.appendChild(label); // Add the label with the checkbox to the container
  });

  // Select all dynamically created checkboxes
  const checkboxes = filterContainer.querySelectorAll('input[type="checkbox"][data-effect]');
  const products = document.querySelectorAll('.collection-product_item'); // Adjusted to match your CMS item wrapper class


  // Function to filter products based on selected checkboxes
  function filterProducts() {
    const selectedEffects = Array.from(checkboxes)
      .filter(checkbox => checkbox.checked)
      .map(checkbox => checkbox.getAttribute('data-effect'));

    products.forEach(product => {
      const productEffect = product.getAttribute('data-effect'); // Gets the data-effect attribute from each product
      if (selectedEffects.length === 0 || selectedEffects.includes(productEffect)) {
        product.style.display = 'block';
      } else {
        product.style.display = 'none';
      }
    });
  }

  // Add event listeners to checkboxes
  checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', filterProducts);
  });
});

document.addEventListener("DOMContentLoaded", function () {
  // Create a set to store unique phenotypes
  const phenotypes = new Set();

  // Select all the elements that contain the "Phenotype" values (from hidden CMS Collection List)
  const phenotypeElements = document.querySelectorAll('.hidden-phenotype-element');

  // Loop through each element and add its value to the set (to ensure uniqueness)
  phenotypeElements.forEach(element => {
    const phenotype = element.textContent.trim();
    if (phenotype) {
      phenotypes.add(phenotype);
    }
  });

  // Select the same container for phenotype checkboxes
  const filterContainer = document.querySelector('.filter-container'); // Same container for both checkboxes

  // Create a checkbox for each unique phenotype
  phenotypes.forEach(phenotype => {
    const label = document.createElement('label');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.setAttribute('data-phenotype', phenotype);
    label.appendChild(checkbox);
    label.appendChild(document.createTextNode(' ' + phenotype));
    filterContainer.appendChild(label);
  });

  // Select all dynamically created phenotype checkboxes
  const phenotypeCheckboxes = filterContainer.querySelectorAll('input[type="checkbox"][data-phenotype]');
  const products = document.querySelectorAll('.collection-product_item');

  // Function to filter products based on selected phenotypes
  function filterProductsByPhenotype() {
    const selectedPhenotypes = Array.from(phenotypeCheckboxes)
      .filter(checkbox => checkbox.checked)
      .map(checkbox => checkbox.getAttribute('data-phenotype'));

    products.forEach(product => {
      const productPhenotype = product.getAttribute('data-phenotype');
      if (selectedPhenotypes.length === 0 || selectedPhenotypes.includes(productPhenotype)) {
        product.style.display = 'block';
      } else {
        product.style.display = 'none';
      }
    });
  }

  // Add event listeners to phenotype checkboxes
  phenotypeCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', filterProductsByPhenotype);
  });
});

// FUNCTION: Shipping Protection
document.addEventListener('DOMContentLoaded', () => {
    const insuranceToggle = document.getElementById('insuranceToggle');
    const shippingInsuranceAmountElement = document.getElementById('shipping-insurance-amount');

    // Event listener for the toggle
    insuranceToggle.addEventListener('change', async () => {
        if (insuranceToggle.checked) {
            console.log('Toggle is ON: Enabling insurance...');
            const cart = await Smootify.reloadCart();
            await adjustInsurance(cart);
        } else {
            console.log('Toggle is OFF: Removing insurance...');
            await removeAllInsurance();
            updateInsuranceAmount(null); // Show "Order Not Insured"
        }
        hideShippingInsurance(); // Ensure it's hidden after toggle
    });

    // Event listener for dynamic cart updates
    document.addEventListener('smootify:cart_updated', async (event) => {
        const cart = event.detail;
        console.log("Cart updated dynamically:", cart);

        // Update insurance dynamically based on the toggle and cart state
        if (insuranceToggle.checked) {
            await adjustInsurance(cart);
        } else {
            updateInsuranceAmount(null); // Show "Order Not Insured"
        }
        hideShippingInsurance(); // Ensure it's hidden after cart update
    });

    // Function to dynamically adjust insurance based on the cart subtotal
    async function adjustInsurance(cart) {
        try {
            console.log("Adjusting insurance dynamically based on the updated cart...");

            const insuranceProducts = [
                { maxSubtotal: 50, merchandiseId: "gid://shopify/ProductVariant/49991308542239", price: 3 },
                { maxSubtotal: 100, merchandiseId: "gid://shopify/ProductVariant/49991308575007", price: 6 },
                { maxSubtotal: 150, merchandiseId: "gid://shopify/ProductVariant/50007044718879", price: 9 },
                { maxSubtotal: 200, merchandiseId: "gid://shopify/ProductVariant/49991308607775", price: 12 },
                { maxSubtotal: 250, merchandiseId: "gid://shopify/ProductVariant/49991308551647", price: 15 },
                { maxSubtotal: 300, merchandiseId: "gid://shopify/ProductVariant/50007044784415", price: 18 },
                { maxSubtotal: 350, merchandiseId: "gid://shopify/ProductVariant/50031541387551", price: 21 },
                { maxSubtotal: 400, merchandiseId: "gid://shopify/ProductVariant/50031541420319", price: 24 },
                { maxSubtotal: 450, merchandiseId: "gid://shopify/ProductVariant/50031541453087", price: 27 },
                { maxSubtotal: 500, merchandiseId: "gid://shopify/ProductVariant/50031541485855", price: 30 },
                { maxSubtotal: 550, merchandiseId: "gid://shopify/ProductVariant/50374197313823", price: 33 },
                { maxSubtotal: 600, merchandiseId: "gid://shopify/ProductVariant/50374197346591", price: 36 },
                { maxSubtotal: 650, merchandiseId: "gid://shopify/ProductVariant/49991308542239", price: 39 },
                { maxSubtotal: 700, merchandiseId: "gid://shopify/ProductVariant/50374197412127", price: 42 },
                { maxSubtotal: 750, merchandiseId: "gid://shopify/ProductVariant/50374197444895", price: 45 },
                { maxSubtotal: 800, merchandiseId: "gid://shopify/ProductVariant/50374197477663", price: 48 },
                { maxSubtotal: 850, merchandiseId: "gid://shopify/ProductVariant/50374197510431", price: 51 },
                { maxSubtotal: 900, merchandiseId: "gid://shopify/ProductVariant/50374197543199", price: 54 },
                { maxSubtotal: 950, merchandiseId: "gid://shopify/ProductVariant/50374197575967", price: 57 },
                { maxSubtotal: 1000, merchandiseId: "gid://shopify/ProductVariant/50374197608735", price: 60 }
            ];

            const subtotal = cart.lines.nodes
                .filter(line => !insuranceProducts.some(product => product.merchandiseId === line.merchandise.id))
                .reduce((total, line) => total + parseFloat(line.cost.totalAmount.amount), 0);

            console.log("Adjusted Cart Subtotal (excluding insurance):", subtotal, cart.cost.subtotalAmount.currencyCode);

            if (subtotal === 0) {
                console.log("Cart subtotal is $0. No shipping insurance will be added or updated.");
                updateInsuranceAmount(null);
                return;
            }

            const selectedInsurance = insuranceProducts.find(product => subtotal <= product.maxSubtotal);

            // Update the displayed insurance amount
            updateInsuranceAmount(selectedInsurance.price);

            const existingInsuranceLines = cart.lines.nodes.filter(line =>
                insuranceProducts.some(product => product.merchandiseId === line.merchandise.id)
            );

            if (existingInsuranceLines.length === 0) {
                console.log("No insurance currently in the cart. Adding correct insurance.");
                await addInsurance(selectedInsurance.merchandiseId);
                return;
            }

            // Remove incorrect insurance products
            for (const line of existingInsuranceLines) {
                if (line.merchandise.id !== selectedInsurance.merchandiseId) {
                    console.log(`Removing incorrect insurance product: ${line.merchandise.id}`);
                    await removeInsurance(line.id);
                }
            }

            const insuranceAlreadyInCart = cart.lines.nodes.some(line =>
                line.merchandise.id === selectedInsurance.merchandiseId
            );

            if (!insuranceAlreadyInCart) {
                await addInsurance(selectedInsurance.merchandiseId);
            } else {
                console.log(`Correct shipping insurance is already in the cart.`);
            }
        } catch (error) {
            console.error("Error during insurance adjustment:", error);
        }
    }

    // Function to update the displayed insurance amount
    function updateInsuranceAmount(amount) {
        if (amount !== null) {
            shippingInsuranceAmountElement.innerText = `$${Math.round(amount)}`;
        } else {
            shippingInsuranceAmountElement.innerText = "Order Not Insured";
        }
    }

    // Add the correct insurance product to the cart
    async function addInsurance(merchandiseId) {
        try {
            const productsToAdd = [{ quantity: 1, merchandiseId }];
            await Smootify.addToCart(productsToAdd);
            console.log(`Shipping insurance added: ${merchandiseId}`);
        } catch (error) {
            console.error("Error adding shipping insurance:", error);
        }
    }

    // Remove all insurance products from the cart
    async function removeAllInsurance() {
        try {
            const cart = await Smootify.reloadCart();
            const insuranceProducts = [
                "gid://shopify/ProductVariant/49991308542239",
                "gid://shopify/ProductVariant/49991308575007",
                "gid://shopify/ProductVariant/50007044718879",
                "gid://shopify/ProductVariant/49991308607775",
                "gid://shopify/ProductVariant/49991308551647",
                "gid://shopify/ProductVariant/50007044784415",
                "gid://shopify/ProductVariant/50031541387551",
                "gid://shopify/ProductVariant/50031541420319",
                "gid://shopify/ProductVariant/50031541453087",
                "gid://shopify/ProductVariant/50031541485855",
                "gid://shopify/ProductVariant/50374197313823",
                "gid://shopify/ProductVariant/50374197346591",
                "gid://shopify/ProductVariant/50374197412127",
                "gid://shopify/ProductVariant/50374197444895",
                "gid://shopify/ProductVariant/50374197477663",
                "gid://shopify/ProductVariant/50374197510431",
                "gid://shopify/ProductVariant/50374197543199",
                "gid://shopify/ProductVariant/50374197575967",
                "gid://shopify/ProductVariant/50374197608735"
            ];

            const insuranceLines = cart.lines.nodes.filter(line =>
                insuranceProducts.includes(line.merchandise.id)
            );

            for (const line of insuranceLines) {
                console.log(`Removing insurance product: ${line.merchandise.id}`);
                await removeInsurance(line.id);
            }

            updateInsuranceAmount(null); // Clear the displayed insurance amount
        } catch (error) {
            console.error("Error removing insurance:", error);
        }
    }

    // Remove a specific insurance product from the cart
    async function removeInsurance(cartItemId) {
        const cartItemElement = document.querySelector(`cart-item[data-id="${cartItemId}"]`);
        if (cartItemElement) {
            const removeButton = cartItemElement.querySelector('button[data-action="remove"]');
            if (removeButton) {
                await new Promise(resolve => {
                    const onCartUpdated = () => {
                        document.removeEventListener('smootify:cart_updated', onCartUpdated);
                        resolve();
                    };
                    document.addEventListener('smootify:cart_updated', onCartUpdated);
                    removeButton.click(); // Trigger the click to remove the product
                });
            }
        }
    }

    // Function to hide all shipping insurance elements
    function hideShippingInsurance() {
        document.querySelectorAll("cart-item").forEach(item => {
            const titleElement = item.querySelector('[cart-item="title"]');
            if (titleElement && titleElement.textContent.includes("Shipping Insurance")) {
                item.style.display = "none";
            }
        });
    }

    // Ensure shipping insurance is hidden on page load
    hideShippingInsurance();
});

// FUNCTION: Wholesale Functionality 
document.addEventListener('smootify:loaded', () => {
    console.log("Smootify APIs are available");

    // Function to check and hide the specific "WS" option in the variant selector
    const checkAndHideWSOption = (customerTags) => {
        const variantSelectors = document.querySelectorAll('variant-selector');

        variantSelectors.forEach((selector) => {
            const selectField = selector.querySelector('select');
            if (selectField) {
                const options = selectField.options;

                for (let i = 0; i < options.length; i++) {
                    if (options[i].value === 'WS') {
                        // Hide the "WS" option for unauthorized users
                        if (!customerTags || !customerTags.includes('wholesale')) {
                            options[i].style.display = 'none';
                            console.log('"WS" option hidden for unauthorized users.');
                        } else {
                            options[i].style.display = ''; // Show the "WS" option for authorized users
                            console.log('"WS" option visible for wholesale customers.');
                        }
                        break; // Exit loop after handling "WS"
                    }
                }
            }
        });
    };

    // Listen for the customer authentication change event
    document.addEventListener('smootify:user_auth_change', async (event) => {
        const customer = event.detail;

        if (customer) {
            try {
                const { customer: detailedCustomer } = await Smootify.queryCustomer(`
                    id
                    tags
                    firstName
                `);

                if (detailedCustomer) {
                    // Update the greeting message
                    const loginMessageElement = document.querySelector('#login-message');
                    if (loginMessageElement) {
                        loginMessageElement.textContent = `Hello, ${detailedCustomer.firstName}`;
                    }

                    // Check if the customer has the "wholesale" tag
                    if (detailedCustomer.tags.includes('wholesale')) {
                        console.log('Customer has "wholesale" tag. Applying discount...');
                        Smootify.applyCouponCode('wholesale50');

                        // Hide the free shipping wrapper
                        const freeShippingWrapper = document.querySelector('#free-shipping-wrapper');
                        if (freeShippingWrapper) {
                            freeShippingWrapper.style.display = 'none';
                            console.log('Free shipping wrapper hidden for wholesale customers.');
                        }

                        // Apply pricing logic for wholesale customers
                        const roundUpToPenny = (value) => (Math.ceil(value * 100) / 100).toFixed(2);
                        const updatePricesWithDelay = (priceElement, priceText) => {
                            setTimeout(() => {
                                const numericPrice = parseFloat(priceText.replace('$', '').trim());
                                if (!isNaN(numericPrice)) {
                                    const discountedPrice = roundUpToPenny(numericPrice / 2);
                                    const originalPriceHTML = `<span style="text-decoration: line-through; color: gray; margin-right: 5px;">$${numericPrice.toFixed(2)}</span>`;
                                    const discountedPriceHTML = `<span style="color: black; font-weight: bold;">$${discountedPrice}</span>`;
                                    priceElement.innerHTML = `${originalPriceHTML} ${discountedPriceHTML}`;
                                    priceElement.classList.add('price-updated');
                                }
                            }, 1000);
                        };

                        const applyPricingLogic = () => {
                            const priceElements = document.querySelectorAll('[data-prop="price"]');
                            priceElements.forEach((priceElement) => {
                                if (!priceElement.classList.contains('price-updated')) {
                                    const priceText = priceElement.textContent.trim();
                                    updatePricesWithDelay(priceElement, priceText);
                                }
                            });
                        };

                        applyPricingLogic();

                        const productWrapper = document.querySelector('smootify-product');
                        if (productWrapper) {
                            productWrapper.addEventListener('changeVariant', (event) => {
                                const priceElement = document.querySelector('[data-prop="price"]');
                                if (priceElement) {
                                    const priceText = priceElement.textContent.trim();
                                    updatePricesWithDelay(priceElement, priceText);
                                }
                            });
                        }
                    } else {
                        console.log('Customer does not have the "wholesale" tag.');
                    }
                }

                // Check and hide the "WS" option for customers
                checkAndHideWSOption(detailedCustomer.tags);
            } catch (error) {
                console.error('Error querying customer data:', error);
            }
        } else {
            console.log('User is not logged in.');
            checkAndHideWSOption(null); // Hide "WS" option for logged-out users
        }
    });

    // Listen for the product load event
    document.addEventListener('smootify:product_loaded', async (event) => {
        const { id, product } = event.detail;
        console.log("Product loaded:", product);

        try {
            const { customer: detailedCustomer } = await Smootify.queryCustomer(`
                id
                tags
            `);

            checkAndHideWSOption(detailedCustomer ? detailedCustomer.tags : null);
        } catch (error) {
            console.error('Error querying customer data:', error);
            checkAndHideWSOption(null);
        }
    });
});