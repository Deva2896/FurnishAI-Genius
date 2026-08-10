export type Language = 'en' | 'mr';

export type TranslationKey = keyof typeof TRANSLATIONS;

/**
 * Flat key -> { en, mr } dictionary. Kept intentionally simple (no nested
 * namespacing, no external i18n library) since this prototype only needs
 * a runtime toggle between two locales. Real Angular i18n tooling
 * (`$localize` / `ng extract-i18n`) bakes locale into the build instead of
 * allowing an in-session switch, which is why a small custom service is
 * used here instead.
 */
export const TRANSLATIONS = {
  'brand.name': { en: 'FurnishAI Genius', mr: 'FurnishAI Genius' },
  'language.label': { en: 'Language', mr: 'भाषा' },

  'scanner.hero.title': {
    en: 'Snap your room, get AI furniture suggestions! ✨',
    mr: 'तुमच्या खोलीचा फोटो काढा, AI फर्निचर सजेशन्स मिळवा! ✨'
  },
  'scanner.hero.subtitle': {
    en: 'Upload a photo of your room and discover the perfect furniture for your space.',
    mr: 'तुमच्या खोलीचा फोटो अपलोड करा आणि तुमच्या जागेसाठी योग्य फर्निचर शोधा.'
  },
  'scanner.upload.ariaUpload': { en: 'Upload your room photo', mr: 'खोलीचा फोटो अपलोड करा' },
  'scanner.upload.ariaChange': { en: 'Change your room photo', mr: 'खोलीचा फोटो बदला' },
  'scanner.upload.changeAria': { en: 'Change photo', mr: 'फोटो बदला' },
  'scanner.upload.removeAria': { en: 'Remove photo', mr: 'फोटो काढून टाका' },
  'scanner.upload.cta': { en: 'Tap or drop your room photo here', mr: 'खोलीचा फोटो येथे टाका किंवा निवडा' },
  'scanner.upload.hint': { en: 'JPG, PNG — up to 8MB', mr: 'JPG, PNG — कमाल 8MB' },
  'scanner.upload.previewAlt': { en: 'Uploaded photo of your room', mr: 'अपलोड केलेल्या खोलीचा फोटो' },
  'scanner.scanning': { en: 'AI is scanning your room...', mr: 'AI तुमची खोली स्कॅन करत आहे...' },
  'scanner.prompt.label': { en: 'What do you want in this room?', mr: 'तुम्हाला या खोलीत काय हवे आहे?' },
  'scanner.prompt.placeholder': { en: 'e.g. L-shape sofa, TV unit', mr: 'उदा. एल-शेप सोफा, टीव्ही युनिट' },
  'scanner.cta.idle': { en: 'Generate AI Designs ✨', mr: 'AI डिझाईन तयार करा ✨' },
  'scanner.cta.busy': { en: 'Generating AI designs...', mr: 'AI डिझाईन तयार करत आहे...' },

  'validation.imageRequired': { en: 'Please upload a room photo first.', mr: 'कृपया आधी खोलीचा फोटो अपलोड करा.' },
  'validation.promptRequired': { en: 'Please tell us what you need.', mr: 'कृपया तुम्हाला काय हवे आहे ते लिहा.' },
  'validation.bothRequired': { en: 'Please add both a photo and a description.', mr: 'कृपया फोटो आणि तपशील दोन्ही भरा.' },
  'validation.imageType': { en: 'Please choose a valid image file (JPG/PNG).', mr: 'कृपया वैध फोटो फाईल निवडा (JPG/PNG).' },
  'validation.imageSize': { en: 'Photo size should be under 8MB.', mr: 'फोटो साईझ 8MB पेक्षा कमी असावी.' },
  'validation.imageRead': { en: 'Could not read the photo, please try again.', mr: 'फोटो वाचता आला नाही, पुन्हा प्रयत्न करा.' },
  'validation.generationFailed': {
    en: 'Could not generate AI designs, please try again.',
    mr: 'AI डिझाईन तयार करता आले नाही, पुन्हा प्रयत्न करा.'
  },
  'validation.selectFurniture': { en: 'Please select at least one furniture item.', mr: 'कृपया किमान एक फर्निचर निवडा.' },

  'toast.added': { en: '{{name}} added ✓', mr: '{{name}} जोडले ✓' },
  'toast.removed': { en: '{{name}} removed', mr: '{{name}} काढले' },

  'dashboard.title': { en: 'AI Room Suggestions ✨', mr: 'AI रूम सजेशन्स ✨' },
  'dashboard.backAria': { en: 'Go back', mr: 'मागे जा' },
  'dashboard.catalogTitle': { en: 'Recommended Furniture', mr: 'शिफारस केलेले फर्निचर' },
  'dashboard.itemsSelected': { en: '{{count}} items selected', mr: '{{count}} वस्तू निवडल्या' },
  'dashboard.proceed': { en: 'Proceed to Quotation →', mr: 'कोटेशनकडे जा →' },
  'dashboard.closeAria': { en: 'Close', mr: 'बंद करा' },
  'dashboard.hotspotAria': { en: 'View AI suggestion for {{zone}}', mr: '{{zone}} साठी AI सूचना पहा' },

  'furniture.addToRoom': { en: 'Add to Room', mr: 'रूममध्ये जोडा' },
  'furniture.added': { en: '✓ Added', mr: '✓ जोडले' },
  'furniture.addedLabel': { en: 'Added', mr: 'जोडले' },
  'furniture.availability.in-stock': { en: 'In Stock', mr: 'उपलब्ध' },
  'furniture.availability.made-to-order': { en: 'Made to Order', mr: 'ऑर्डरनुसार तयार' },
  'furniture.availability.out-of-stock': { en: 'Out of Stock', mr: 'अनुपलब्ध' },
  'furniture.category.Sofa': { en: 'Sofa', mr: 'सोफा' },
  'furniture.category.TV Unit': { en: 'TV Unit', mr: 'टीव्ही युनिट' },
  'furniture.category.Table': { en: 'Table', mr: 'टेबल' },
  'furniture.category.Chair': { en: 'Chair', mr: 'खुर्ची' },
  'furniture.category.Storage': { en: 'Storage', mr: 'स्टोरेज' },
  'furniture.category.Lighting': { en: 'Lighting', mr: 'दिवे' },

  'hotspot.sofaArea.title': { en: 'Sofa Area', mr: 'सोफा जागा' },
  'hotspot.sofaArea.desc': { en: 'Perfect fit for this corner', mr: 'या कोपऱ्यासाठी योग्य निवड' },
  'hotspot.tvArea.title': { en: 'TV Area', mr: 'टीव्ही जागा' },
  'hotspot.tvArea.desc': { en: 'Ideal for your wall', mr: 'तुमच्या भिंतीसाठी योग्य' },
  'hotspot.cornerArea.title': { en: 'Corner Area', mr: 'कोपऱ्याची जागा' },
  'hotspot.cornerArea.desc': { en: 'Perfect for this layout', mr: 'या मांडणीसाठी योग्य' },

  'quotation.title': { en: 'Your Quotation', mr: 'तुमचे कोटेशन' },
  'quotation.editAria': { en: 'Edit selection', mr: 'निवड संपादित करा' },
  'quotation.successTitle': { en: 'Your dream room design is ready!', mr: 'तुमचे ड्रीम रूम डिझाईन तयार आहे!' },
  'quotation.successSubtitle': {
    en: 'Based on your selection, your estimated furniture quotation is ready.',
    mr: 'तुमच्या निवडीनुसार तुमचा अंदाजे फर्निचर कोटेशन तयार झाला आहे.'
  },
  'quotation.summaryTitle': { en: 'Quotation Summary', mr: 'कोटेशन सारांश' },
  'quotation.item': { en: 'Item', mr: 'वस्तू' },
  'quotation.qty': { en: 'Qty', mr: 'संख्या' },
  'quotation.price': { en: 'Price', mr: 'किंमत' },
  'quotation.total': { en: 'Total', mr: 'एकूण' },
  'quotation.whatsapp': { en: 'Share Estimate on WhatsApp', mr: 'व्हॉट्सअपवर एस्टिमेट शेअर करा' },
  'quotation.manager': { en: 'Talk to Store Manager', mr: 'स्टोअर मॅनेजरशी बोला' },
  'quotation.managerToast': {
    en: 'Store manager will contact you shortly.',
    mr: 'स्टोअर मॅनेजर लवकरच तुमच्याशी संपर्क साधतील.'
  },
  'quotation.whatsappReady': { en: 'Your furniture quotation is ready! 🛋️', mr: 'तुमचे फर्निचर कोटेशन तयार आहे! 🛋️' },
  'quotation.whatsappTotal': { en: 'Total', mr: 'एकूण' },

  'offers.title': { en: 'Store Offers 🎁', mr: 'स्टोअर ऑफर्स 🎁' },
  'offers.hdfc.title': { en: '10% off on HDFC cards', mr: 'HDFC कार्डवर १०% सूट' },
  'offers.hdfc.desc': {
    en: 'Get an instant 10% discount when you pay with an HDFC credit/debit card.',
    mr: 'HDFC क्रेडिट/डेबिट कार्डने पेमेंट केल्यास १०% त्वरित सूट.'
  },
  'offers.delivery.title': { en: 'Free home delivery in Pune', mr: 'पुण्यात फ्री होम डिलिव्हरी' },
  'offers.delivery.desc': {
    en: 'Free home delivery on all orders within Pune city.',
    mr: 'पुणे शहरात सर्व ऑर्डरवर मोफत होम डिलिव्हरी.'
  },
  'offers.today.title': { en: 'Extra offer on orders placed today', mr: 'आजच्या ऑर्डरवर अतिरिक्त ऑफर' },
  'offers.today.desc': {
    en: 'A special extra discount on orders confirmed today.',
    mr: 'आजच कन्फर्म केलेल्या ऑर्डरवर खास अतिरिक्त सवलत.'
  }
} as const;
