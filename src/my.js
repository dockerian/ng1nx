/*
 * my.js
 */

// not used
var dropDownRender = function () {
  var items = this.props.data;
  var selectedItem = this.props.selected
  return (
    <select accessKey="L" value={selectedItem}>
    {
      items.map(function (item) {
        if (selectedItem == item.Name)
          return (<option value={item.Name} selected>{item.Name}</option>)
        else
          return (<option value={item.Name}>{item.Name}</option>)
      })
    }
  </select>);
};

var DropDownClass = React.createClass({

    propTypes: {
        id: React.PropTypes.string.isRequired,
        accessKey: React.PropTypes.string,
        onChange: React.PropTypes.func,
        options: React.PropTypes.array.isRequired,
        optionLabel: React.PropTypes.string,
        optionValue: React.PropTypes.string,
        value: React.PropTypes.oneOfType(
            [
                React.PropTypes.number,
                React.PropTypes.string
            ]
        )
    },

    componentWillReceiveProps: function(nextProps) {
        var selected = this.getSelectedFromProps(nextProps);
        this.setState({
           selected: selected
        });
    },

    getDefaultProps: function() {
        return {
            value: null,
            optionLabel: 'label',
            optionValue: 'value',
            onChange: null
        }
    },

    getInitialState: function() {
        var selected = this.getSelectedFromProps(this.props);
        return {
            selected: selected
        }
    },

    getSelectedFromProps(props) {
        var selected;
        if (props.value === null && props.options.length !== 0) {
            selected = props.options[0][props.optionValue];
        } else {
            selected = props.value;
        }
        return selected
    },

    handleChange: function(e) {
        if (this.props.onChange) {
            var change = {
              oldValue: this.state.selected,
              newValue: e.target.value
            }
            this.props.onChange(change);
        }
        this.setState({selected: e.target.value});
    },

    render: function() {
        var self = this;
        var options = self.props.options.map(function(option) {
            return (
                <option key={option[self.props.optionValue]}
                        value={option[self.props.optionValue]}>
                    {option[self.props.optionLabel]}
                </option>
            )
        });
        return (
            <select id={this.props.id}
                    accessKey={this.props.accessKey}
                    className='form-control'
                    value={this.state.selected}
                    onChange={this.handleChange}>
                {options}
            </select>
        )
    }

});

var greetings = {
  hello: {
    "af": "Hallo",
    "am": "ሰላም",
    "ar": "مرحبا / Marhaba",
    "az": "Salam",
    "be": "добры дзень",
    "bg": "Здравейте / Zdravei / Zdrasti",
    "bn": "হ্যালো",
    "ca": "Hola",
    "cs": "Dobrý den / Ahoj",
    "cy": "Hylo / Sut Mae?",
    "da": "Goddag / Hej",
    "de": "Guten Tag",
    "ds": "Goddag / Hej",
    "el": "Χαίρετε / Gia'sou",
    "en": "Hello",
    "eo": "Saluton",
    "es": "Hola",
    "eu": "Kaixo",
    "fa": "سلام",
    "fi": "Hei",
    "fp*": "Kamusta",
    "fr": "Bonjour",
    "fy": "Hoi",
    "ga": "Dia dhuit",
    "gl": "Ola",
    "gu": "હેલો",
    "he": "שלום / Shalom",
    "hi": "नमस्ते / Namaste",
    "hm*": "Nyob zoo",
    "hr": "Zdravo",
    "ht": "Alo",
    "hu": "Jó napot",
    "hw": "Aloha",
    "hy": "Բարեւ / Parev",
    "id": "Halo",
    "ig": "Nnọọ",
    "is": "Halló / Góðan daginn",
    "it": "Salve / Ciao",
    "ja": "こんにちは / Ohayo / Konnichiwa / Konban Wa",
    "jv": "Halo",
    "ka": "გაუმარჯოს",
    "kk": "Сәлеметсіз бе / Salemetsiz Be?",
    "km": "ជំរាបសួរ",
    "kn": "ಹಲೋ",
    "ko": "여보세요 / Ahn-Young-Ha-Se-Yo",
    "ku": "Slav",
    "ky": "Салам",
    "la": "Salve",
    "lo": "ສະບາຍດີ",
    "lt": "Sveiki",
    "lv": "Sveiki",
    "mg": "Salama",
    "mk": "Здраво",
    "ml": "ഹലോ",
    "mn": "Сайн уу",
    "mo": "Sain Bainuu",
    "mr": "हॅलो",
    "mt": "Bongu",
    "my": "ဟလို",
    "ne": "नमस्कार",
    "nl": "Hallo / Goede dag",
    "no": "Hallo",
    "ny": "Moni",
    "pa": "ਸਤ ਸ੍ਰੀ ਅਕਾਲ",
    "pl": "Dzien' dobry / Cześć",
    "ps": "سلام",
    "pt": "Olá",
    "ro": "Bunã ziua",
    "ru": "Здравствуйте / Zdras-Tvuy-Te",
    "sa": "Salaam",
    "sd": "سلام",
    "se": "Hallo",
    "si": "ဟလို / හෙලෝ",
    "sk": "Ahoj",
    "sl": "Zdravo",
    "sm": "Talofa",
    "sn": "Mhoro",
    "sq": "Mirëdita",
    "sr": "Salve / Salvëte / Здраво",
    "st": "Lumela",
    "sv": "Hallå",
    "sw": "Jambo / Hujambo / Habari",
    "ta": "வணக்கம்",
    "te": "హలో",
    "tg": "Салом",
    "th": "สวัสดี / Sa-wat-dee",
    "tr": "Merhaba",
    "uk": "Здравствуйте / Vitayu",
    "uz": "Salom",
    "vi": "Xin chào / Chào bạn",
    "xh": "Mholo",
    "yi": "העלא / Sholem Aleychem",
    "yo": "Pẹlẹ o",
    "zh": "你好 / Nay Hoh / Nihao",
    "zu": "Sawubona"
  },
  langs: {
    "aa": "Afar",
    "ab": "Abkhazian",
    "ae": "Avestan",
    "af": "Afrikaans",
    "ak": "Akan",
    "am": "Amharic",
    "an": "Aragonese",
    "ar": "Arabic",
    "as": "Assamese",
    "av": "Avaric",
    "ay": "Aymara",
    "az": "Azerbaijani",
    "ba": "Bashkir",
    "be": "Belarusian; Biélorussie",
    "bg": "Bulgarian",
    "bh": "Bihari languages",
    "bi": "Bislama",
    "bm": "Bambara",
    "bn": "Bengali",
    "bo": "Tibetan",
    "br": "Breton",
    "bs": "Bosnian",
    "ca": "Catalan; Valencian",
    "ce": "Chechen",
    "ch": "Chamorro",
    "co": "Corsican",
    "cr": "Cree",
    "cs": "Czech",
    "cu": "Church Slavic; Old Slavonic; Church Slavonic; Old Bulgarian; Old Church Slavonic",
    "cv": "Chuvash",
    "cy": "Welsh",
    "da": "Danish",
    "de": "German",
    "dv": "Divehi; Dhivehi; Maldivian",
    "dz": "Dzongkha",
    "ee": "Ewe",
    "el": "Greek, Modern (1453-)",
    "en": "English",
    "eo": "Esperanto",
    "es": "Spanish; Castilian",
    "et": "Estonian",
    "eu": "Basque",
    "fa": "Persian",
    "ff": "Fulah",
    "fi": "Finnish",
    "fj": "Fijian",
    "fo": "Faroese",
    "fp*": "Filipino",
    "fr": "French",
    "fy": "Frisian; Western Frisian",
    "ga": "Irish",
    "gd": "Gaelic; Scottish Gaelic",
    "gl": "Galician",
    "gn": "Guarani",
    "gu": "Gujarati",
    "gv": "Manx",
    "ha": "Hausa",
    "he": "Hebrew",
    "hi": "Hindi",
    "hm*": "Hmong",
    "ho": "Hiri Motu",
    "hr": "Croatian",
    "ht": "Haitian; Haitian Creole",
    "hu": "Hungarian",
    "hw*": "Hawaiian",
    "hy": "Armenian",
    "hz": "Herero",
    "ia": "Interlingua (International Auxiliary Language Association)",
    "id": "Indonesian",
    "ie": "Interlingue; Occidental",
    "ig": "Igbo",
    "ii": "Sichuan Yi; Nuosu",
    "ik": "Inupiaq",
    "io": "Ido",
    "is": "Icelandic",
    "it": "Italian",
    "iu": "Inuktitut",
    "ja": "Japanese",
    "jv": "Javanese",
    "ka": "Georgian",
    "kg": "Kongo",
    "ki": "Kikuyu; Gikuyu",
    "kj": "Kuanyama; Kwanyama",
    "kk": "Kazakh",
    "kl": "Kalaallisut; Greenlandic",
    "km": "Central Khmer",
    "kn": "Kannada",
    "ko": "Korean",
    "kr": "Kanuri",
    "ks": "Kashmiri",
    "ku": "Kurdish",
    "kv": "Komi",
    "kw": "Cornish",
    "ky": "Kirghiz; Kyrgyz",
    "la": "Latin",
    "lb": "Luxembourgish; Letzeburgesch",
    "lg": "Ganda",
    "li": "Limburgan; Limburger; Limburgish",
    "ln": "Lingala",
    "lo": "Lao",
    "lt": "Lithuanian",
    "lu": "Luba-Katanga",
    "lv": "Latvian",
    "mg": "Malagasy",
    "mh": "Marshallese",
    "mi": "Maori",
    "mk": "Macedonian",
    "ml": "Malayalam",
    "mn": "Mongolian",
    "mr": "Marathi",
    "ms": "Malay",
    "mt": "Maltese",
    "my": "Birman; Burmese; Myanmar",
    "na": "Nauru",
    "nb": "Bokmål, Norwegian; Norwegian Bokmål",
    "nd": "Ndebele, North; North Ndebele",
    "ne": "Nepali",
    "ng": "Ndonga",
    "nl": "Dutch; Flemish",
    "nn": "Norwegian Nynorsk; Nynorsk, Norwegian",
    "no": "Norwegian",
    "nr": "Ndebele, South; South Ndebele",
    "nv": "Navajo; Navaho",
    "ny": "Chichewa; Chewa; Nyanja",
    "oc": "Occitan (post 1500); Provençal",
    "oj": "Ojibwa",
    "om": "Oromo",
    "or": "Oriya",
    "os": "Ossetian; Ossetic",
    "pa": "Panjabi; Punjabi",
    "pi": "Pali",
    "pl": "Polish",
    "ps": "Pushto; Pashto",
    "pt": "Portuguese",
    "qu": "Quechua",
    "rm": "Romansh",
    "rn": "Rundi",
    "ro": "Romanian; Moldavian; Moldovan",
    "ru": "Russian",
    "rw": "Kinyarwanda",
    "sa": "Sanskrit",
    "sc": "Sardinian",
    "sd": "Sindhi",
    "se": "Northern Sami",
    "sg": "Sango",
    "si": "Sinhala; Sinhalese",
    "sk": "Slovak",
    "sl": "Slovenian",
    "sm": "Samoan",
    "sn": "Shona",
    "so": "Somali",
    "sq": "Albanian",
    "sr": "Serbian",
    "ss": "Swati",
    "st": "Sotho, Southern",
    "su": "Sundanese",
    "sv": "Swedish",
    "sw": "Swahili",
    "ta": "Tamil",
    "te": "Telugu",
    "tg": "Tajik",
    "th": "Thai",
    "ti": "Tigrinya",
    "tk": "Turkmen",
    "tl": "Tagalog",
    "tn": "Tswana",
    "to": "Tonga (Tonga Islands)",
    "tr": "Turkish",
    "ts": "Tsonga",
    "tt": "Tatar",
    "tw": "Twi",
    "ty": "Tahitian",
    "ug": "Uighur; Uyghur",
    "uk": "Ukrainian",
    "ur": "Urdu",
    "uz": "Uzbek",
    "ve": "Venda",
    "vi": "Vietnamese",
    "vo": "Volapük",
    "wa": "Walloon",
    "wo": "Wolof",
    "xh": "Xhosa",
    "yi": "Yiddish",
    "yo": "Yoruba",
    "za": "Zhuang; Chuang",
    "zh": "Chinese",
    "zu": "Zulu"
  }
};
var optionMap = Object.keys(greetings.langs).map(function (v, i) {
  return { label: greetings.langs[v], value: v }
}).sort(function (a, b) {
  return a.label == b.label ? 0 : (a.label > b.label ? 1 : -1)
});

var DropDown = DropDownClass
var HelloApp = React.createClass({
  componentDidMount: function(){
    ReactDOM.findDOMNode(this.refs.selectLang).focus();
  },
  getInitialState: function () {
    this.greeting = this.greetingDefault;
    this.greetips = this.greetipsDefault;

    return {
      stateLang: "en"
    }
  },

  greet: function (e) {
    var helloLang = greetings.langs[e.newValue];
    var helloText = greetings.hello[e.newValue];
    this.greeting = helloText || `"${this.greetingDefault}"`;
    this.greetips = helloText ? "\u00a0" : `in ${helloLang}`;
    // trigger an intelligent re-render of the component
    this.setState({ stateLang: e.newValue });
  },

  greeting: "",
  greetingDefault: greetings.hello["en"],
  greetips: "",
  greetipsDefault: "\u00a0",

  render: function () {
    return (
      <div id="hello" style={{height:'90%'}}>
        <DropDown id="langs"
          accessKey="L" autoFocus ref="selectLang"
          onChange={this.greet}
          options={optionMap} optionLabel='label' optionValue='value'
          value={this.state.stateLang}
          >
        </DropDown>
        <div id="hello-content">
          <div id="hello-message">
            <h1>{this.greeting}</h1>
            <div>{this.greetips}</div>
          </div>
        </div>
        <div id="hello-footage">
          <span>&copy; 2016 Dockerian</span>
        </div>
      </div>
    )
  }
});

var MyApp = HelloApp
var MyAppElement = document.getElementById("root")

ReactDOM.render(<MyApp></MyApp>, MyAppElement);
