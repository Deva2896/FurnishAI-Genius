export type Language = 'en' | 'mr';

export type TranslationKey = keyof typeof TRANSLATIONS;

/**
 * Flat key -> { en, mr } dictionary. Kept intentionally simple (no nested
 * namespacing, no external i18n library) since this prototype only needs
 * a runtime toggle between two locales. Real Angular i18n tooling
 * (`$localize` / `ng extract-i18n`) bakes locale into the build instead of
 * allowing an in-session switch, which is why a small custom service is
 * used here instead.
 *
 * Copy is written to read as a professional, commercially credible product
 * — no filler emoji, no casual phrasing, matching terminology between the
 * two languages rather than literal word-for-word translation.
 */
export const TRANSLATIONS = {
  'brand.name': { en: 'FurnishAI Genius', mr: 'FurnishAI Genius' },
  'language.label': { en: 'Language', mr: 'भाषा' },

  'common.retry': { en: 'Try again', mr: 'पुन्हा प्रयत्न करा' },
  'common.loading': { en: 'Loading...', mr: 'लोड होत आहे...' },
  'common.networkError': {
    en: 'A network error occurred. Please check your connection and try again.',
    mr: 'नेटवर्क त्रुटी आली. कृपया तुमचे इंटरनेट कनेक्शन तपासून पुन्हा प्रयत्न करा.'
  },
  'common.storeNotFound.title': { en: 'Store not found', mr: 'स्टोअर सापडले नाही' },
  'common.storeNotFound.desc': {
    en: "We couldn't find the store you're looking for. Please check the link and try again.",
    mr: 'तुम्ही शोधत असलेले स्टोअर सापडले नाही. कृपया लिंक तपासून पुन्हा प्रयत्न करा.'
  },

  'scanner.hero.title': { en: 'Create a furniture design for your room', mr: 'तुमच्या खोलीसाठी फर्निचर डिझाइन तयार करा' },
  'scanner.hero.subtitle': {
    en: "Upload a photo of your room and tell us what furniture you're looking for.",
    mr: 'तुमच्या खोलीचा फोटो अपलोड करा आणि तुम्हाला कोणते फर्निचर हवे आहे ते सांगा.'
  },
  'scanner.upload.ariaUpload': { en: 'Upload a photo of your room', mr: 'तुमच्या खोलीचा फोटो अपलोड करा' },
  'scanner.upload.ariaChange': { en: 'Replace your room photo', mr: 'तुमच्या खोलीचा फोटो बदला' },
  'scanner.upload.changeAria': { en: 'Replace photo', mr: 'फोटो बदला' },
  'scanner.upload.removeAria': { en: 'Remove photo', mr: 'फोटो काढा' },
  'scanner.upload.cta': { en: 'Drag and drop a photo, or click to browse', mr: 'फोटो ड्रॅग करून टाका किंवा ब्राउझ करण्यासाठी क्लिक करा' },
  'scanner.upload.hint': { en: 'JPG, PNG or WebP · up to 8 MB', mr: 'JPG, PNG किंवा WebP · कमाल 8 MB' },
  'scanner.upload.previewAlt': { en: 'Your uploaded room photo', mr: 'तुम्ही अपलोड केलेला खोलीचा फोटो' },
  'scanner.processing.step1': { en: 'Analyzing your room...', mr: 'तुमच्या खोलीचे विश्लेषण सुरू आहे...' },
  'scanner.processing.step2': { en: 'Matching furniture recommendations...', mr: 'योग्य फर्निचर शोधले जात आहे...' },
  'scanner.prompt.label': { en: 'What furniture are you looking for?', mr: 'तुम्हाला कोणते फर्निचर हवे आहे?' },
  'scanner.prompt.placeholder': {
    en: 'Example: L-shaped sofa, TV unit, center table',
    mr: 'उदाहरण: एल-आकाराचा सोफा, टीव्ही युनिट, सेंटर टेबल'
  },
  'scanner.cta.idle': { en: 'Generate Design', mr: 'डिझाइन तयार करा' },
  'scanner.cta.busy': { en: 'Generating your design...', mr: 'तुमचे डिझाइन तयार होत आहे...' },

  'validation.imageRequired': { en: 'No room image has been selected.', mr: 'खोलीचा फोटो निवडलेला नाही.' },
  'validation.promptRequired': {
    en: "Please describe the furniture you're looking for.",
    mr: 'कृपया तुम्हाला हवे असलेले फर्निचर सांगा.'
  },
  'validation.bothRequired': {
    en: 'Please add a room photo and describe the furniture you need.',
    mr: 'कृपया खोलीचा फोटो अपलोड करा आणि तुम्हाला हवे असलेले फर्निचर सांगा.'
  },
  'validation.imageType': {
    en: 'Please upload a valid image (JPG, PNG or WebP).',
    mr: 'कृपया वैध फोटो अपलोड करा (JPG, PNG किंवा WebP).'
  },
  'validation.imageSize': { en: 'The image must be smaller than 8 MB.', mr: 'फोटोचा आकार 8 MB पेक्षा कमी असावा.' },
  'validation.imageRead': {
    en: "We couldn't process the image. Please try again.",
    mr: 'फोटो प्रोसेस करता आला नाही. कृपया पुन्हा प्रयत्न करा.'
  },
  'validation.generationFailed': { en: 'Something went wrong. Please try again.', mr: 'काहीतरी चुकले. कृपया पुन्हा प्रयत्न करा.' },
  'validation.selectFurniture': {
    en: 'Please select at least one product to continue.',
    mr: 'पुढे जाण्यासाठी कृपया किमान एक उत्पादन निवडा.'
  },

  'toast.added': { en: 'Product added to your design.', mr: 'उत्पादन तुमच्या डिझाइनमध्ये जोडले.' },
  'toast.removed': { en: 'Product removed from your design.', mr: 'उत्पादन तुमच्या डिझाइनमधून काढले.' },

  'dashboard.title': { en: 'AI-Powered Room Design', mr: 'AI-आधारित रूम डिझाइन' },
  'dashboard.backAria': { en: 'Go back', mr: 'मागे जा' },
  'dashboard.catalogTitle': { en: 'Recommended Furniture', mr: 'शिफारस केलेले फर्निचर' },
  'dashboard.catalogEmpty.title': { en: 'No matching furniture found.', mr: 'जुळणारे फर्निचर सापडले नाही.' },
  'dashboard.catalogEmpty.desc': {
    en: 'Try a different furniture type or search term.',
    mr: 'वेगळा फर्निचर प्रकार किंवा शोध शब्द वापरून पहा.'
  },
  'dashboard.catalogError.title': { en: 'Unable to load furniture.', mr: 'फर्निचर लोड करता आले नाही.' },
  'dashboard.catalogError.desc': { en: 'Please try again.', mr: 'कृपया पुन्हा प्रयत्न करा.' },
  'dashboard.selectedTitle': { en: 'Your Selection', mr: 'तुमची निवड' },
  'dashboard.noSelection': {
    en: 'No products selected yet. Add furniture from the catalog below.',
    mr: 'अद्याप कोणतेही उत्पादन निवडलेले नाही. खालील कॅटलॉगमधून फर्निचर जोडा.'
  },
  'dashboard.itemsSelected': { en: '{{count}} items selected', mr: '{{count}} वस्तू निवडल्या' },
  'dashboard.viewQuotation': { en: 'View Quotation', mr: 'कोटेशन पहा' },
  'dashboard.closeAria': { en: 'Close', mr: 'बंद करा' },
  'dashboard.removeAria': { en: 'Remove {{name}}', mr: '{{name}} काढा' },
  'dashboard.hotspotAria': { en: 'View recommendation for {{zone}}', mr: '{{zone}} साठी शिफारस पहा' },

  'furniture.addToDesign': { en: 'Add to Design', mr: 'डिझाइनमध्ये जोडा' },
  'furniture.added': { en: 'Added', mr: 'जोडले' },
  'furniture.discount': { en: '{{percent}}% off', mr: '{{percent}}% सूट' },

  'hotspot.sofaArea.title': { en: 'Sofa Area', mr: 'सोफा क्षेत्र' },
  'hotspot.sofaArea.desc': {
    en: 'Recommended for this area based on the available space.',
    mr: 'उपलब्ध जागेनुसार या भागासाठी शिफारस केलेले.'
  },
  'hotspot.tvArea.title': { en: 'TV Area', mr: 'टीव्ही क्षेत्र' },
  'hotspot.tvArea.desc': { en: 'Suitable for the selected wall.', mr: 'निवडलेल्या भिंतीसाठी योग्य.' },
  'hotspot.cornerArea.title': { en: 'Corner Area', mr: 'कोपऱ्याचे क्षेत्र' },
  'hotspot.cornerArea.desc': {
    en: 'Complements the selected seating arrangement.',
    mr: 'निवडलेल्या बैठक व्यवस्थेला पूरक.'
  },

  'quotation.title': { en: 'Quotation', mr: 'कोटेशन' },
  'quotation.editAria': { en: 'Edit selection', mr: 'निवड संपादित करा' },
  'quotation.successTitle': { en: 'Your room design is ready', mr: 'तुमचे रूम डिझाइन तयार आहे' },
  'quotation.successSubtitle': {
    en: 'Review the selected furniture and estimated pricing below.',
    mr: 'खाली निवडलेले फर्निचर आणि अंदाजे किंमत तपासा.'
  },
  'quotation.number': { en: 'Quotation No.', mr: 'कोटेशन क्र.' },
  'quotation.date': { en: 'Date', mr: 'दिनांक' },
  'quotation.summaryTitle': { en: 'Order Summary', mr: 'ऑर्डर सारांश' },
  'quotation.item': { en: 'Item', mr: 'वस्तू' },
  'quotation.qty': { en: 'Qty', mr: 'संख्या' },
  'quotation.price': { en: 'Price', mr: 'किंमत' },
  'quotation.discount': { en: 'Discount', mr: 'सूट' },
  'quotation.subtotal': { en: 'Subtotal', mr: 'उपएकूण' },
  'quotation.total': { en: 'Total', mr: 'एकूण' },
  'quotation.delivery': { en: 'Estimated Delivery', mr: 'अंदाजे डिलिव्हरी' },
  'quotation.whatsapp': { en: 'Share Quotation on WhatsApp', mr: 'व्हॉट्सअॅपवर कोटेशन शेअर करा' },
  'quotation.contactStore': { en: 'Contact Store', mr: 'स्टोअरशी संपर्क साधा' },
  'quotation.whatsappHeading': { en: 'Selected Furniture:', mr: 'निवडलेले फर्निचर:' },
  'quotation.noSelection': {
    en: 'No products were selected. Go back to add furniture to your design.',
    mr: 'कोणतेही उत्पादन निवडलेले नाही. फर्निचर जोडण्यासाठी मागे जा.'
  },

  'offers.title': { en: 'Current Offers', mr: 'सध्याच्या ऑफर्स' },
  'offers.hdfc.title': { en: 'HDFC cardholders: 10% discount', mr: 'HDFC कार्डधारकांना 10% सूट' },
  'offers.hdfc.desc': {
    en: 'Get 10% off when you pay using an HDFC Bank credit or debit card.',
    mr: 'HDFC बँकेच्या क्रेडिट किंवा डेबिट कार्डने पेमेंट केल्यास 10% सूट मिळेल.'
  },
  'offers.delivery.title': { en: 'Free delivery within Pune', mr: 'पुण्यात मोफत डिलिव्हरी' },
  'offers.delivery.desc': {
    en: 'Free home delivery on all orders within Pune city limits.',
    mr: 'पुणे शहर हद्दीतील सर्व ऑर्डरवर मोफत होम डिलिव्हरी.'
  },
  'offers.today.title': { en: 'Limited-period showroom offer', mr: 'मर्यादित कालावधीसाठी शोरूम ऑफर' },
  'offers.today.desc': {
    en: 'Ask our team about the current showroom offer on select furniture.',
    mr: 'निवडक फर्निचरवरील सध्याच्या शोरूम ऑफरबद्दल आमच्या टीमला विचारा.'
  },

  'enquiry.title': { en: 'Contact Store', mr: 'स्टोअरशी संपर्क साधा' },
  'enquiry.subtitle': {
    en: 'Share your details and our team will get back to you.',
    mr: 'तुमचे तपशील शेअर करा, आमची टीम लवकरच तुमच्याशी संपर्क साधेल.'
  },
  'enquiry.name.label': { en: 'Full Name', mr: 'पूर्ण नाव' },
  'enquiry.name.placeholder': { en: 'Enter your full name', mr: 'तुमचे पूर्ण नाव टाका' },
  'enquiry.name.required': { en: 'Please enter your full name.', mr: 'कृपया तुमचे पूर्ण नाव टाका.' },
  'enquiry.phone.label': { en: 'Mobile Number', mr: 'मोबाईल नंबर' },
  'enquiry.phone.placeholder': { en: '10-digit mobile number', mr: '10-अंकी मोबाईल नंबर' },
  'enquiry.phone.required': { en: 'Please enter your mobile number.', mr: 'कृपया तुमचा मोबाईल नंबर टाका.' },
  'enquiry.phone.invalid': {
    en: 'Please enter a valid 10-digit mobile number.',
    mr: 'कृपया वैध 10-अंकी मोबाईल नंबर टाका.'
  },
  'enquiry.time.label': { en: 'Preferred Contact Time', mr: 'संपर्कासाठी योग्य वेळ' },
  'enquiry.time.required': { en: 'Please select a preferred contact time.', mr: 'कृपया संपर्कासाठी योग्य वेळ निवडा.' },
  'enquiry.time.placeholder': { en: 'Select a time', mr: 'वेळ निवडा' },
  'enquiry.time.morning': { en: 'Morning (9 AM – 12 PM)', mr: 'सकाळ (9 AM – 12 PM)' },
  'enquiry.time.afternoon': { en: 'Afternoon (12 PM – 4 PM)', mr: 'दुपार (12 PM – 4 PM)' },
  'enquiry.time.evening': { en: 'Evening (4 PM – 8 PM)', mr: 'संध्याकाळ (4 PM – 8 PM)' },
  'enquiry.message.label': { en: 'Message (optional)', mr: 'संदेश (ऐच्छिक)' },
  'enquiry.message.placeholder': {
    en: 'Tell us more about your requirement',
    mr: 'तुमच्या गरजेबद्दल अधिक सांगा'
  },
  'enquiry.submit': { en: 'Submit Enquiry', mr: 'चौकशी सबमिट करा' },
  'enquiry.submitting': { en: 'Submitting...', mr: 'सबमिट होत आहे...' },
  'enquiry.cancel': { en: 'Cancel', mr: 'रद्द करा' },
  'enquiry.success': { en: 'Your enquiry has been submitted.', mr: 'तुमची चौकशी सबमिट झाली आहे.' },
  'enquiry.closeAria': { en: 'Close', mr: 'बंद करा' }
} as const;
