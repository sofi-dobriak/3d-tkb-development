import FormMonster from './form.js';
import SexyInput from '../input/input.js';
import i18next from 'i18next';
import * as yup from 'yup';
import dispatchTrigger from '../../helpers/triggers.js';
import ButtonWithoutIcon from '../../../../../s3d2/scripts/templates/common/ButtonWithoutIcon.js';
import TextInput from '../../../../../s3d2/scripts/templates/common/inputs/TextInput.js';
import s3d2spriteIcon from '../../../../../s3d2/scripts/templates/spriteIcon.js';
import Textarea from '../../../../../s3d2/scripts/templates/common/inputs/Textarea.js';

export default class FormView {
  constructor(props) {
    this._id = `form-${(Math.random() * 1000).toFixed(0)}`;
    this.modalManager = props.modalManager;
    this.inited = false;
    this.config = props.config;
    this.init();
  }

  init() {
    if (!this.inited) {
      document.body.insertAdjacentHTML('beforeend', this.getTemplate());
      window.addEventListener('form-open', () => {
        this.open();
      });
      window.addEventListener('click', (evt) => {
        if (evt.target.closest('[data-form-layout-close]') === null) return;
        this.close();
      });
      window.addEventListener('click', (evt) => {
        if (evt.target.classList.contains('form-layout')) this.close();
      });
      window.addEventListener('click', (evt) => {
        if (evt.target.closest('[data-open-form]') === null) return;
        dispatchTrigger('callback-click', {
          url: window.location.href
        })
        this.open();
      });

      this.initValidation();
      if (this.modalManager.push) {
        this.modalManager.push({
          id: this._id,
          close: () => {
            this.close();
          }
        })
      }
      this.inited = true;
    }
  }

  close() {
    document.querySelector(`#${this._id}`).style.visibility = '';
    document.querySelector(`#${this._id}`).style.opacity = '';
    document.querySelectorAll('[data-form-button-after-success-send]').forEach((btn) => {
      btn.remove();
    });
  }

  open() {
    document.querySelector(`#${this._id}`).style.visibility = 'visible';
    document.querySelector(`#${this._id}`).style.opacity = '1';
    if (this.modalManager.open) this.modalManager.open(this._id);
  }

  getTemplate() {
    return `
        <div class="toast-wrapper" data-toast-wrapper=""></div>
        <div class="form-layout" id="${this._id}">
            <div class="form">
                ${s3d2spriteIcon('close', 'form-layout-close', 'data-form-layout-close')}
                <!--<svg class="form-layout-close" width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="30" cy="30" r="30"></circle>
                  <path d="M37.826 37.826L22.1738 22.1738M22.1738 37.826L37.826 22.1738L22.1738 37.826Z"></path>
                </svg>-->
                <div class="form__title">${i18next.t('title')}</div>
                <div class="text-gray-800 text-style-3-d-fonts-1920-body-medium space-b-6 ">
                  Our team will be in touch shortly to discuss your preferences and guide you through the next steps.
                </div>
                <form data-home-contact="data-home-contact" autocomplete="off">
                  <div class="form-overflow">
                    <div class="form-field form-field-input" data-field-input="data-field-input" data-field-name="data-field-name" data-status="field--inactive">
                        <div class="text-style-3-d-fonts-1920-body-medium text-gray-900 space-b-05">
                          ${i18next.t('Your name')}
                        </div>
                        ${TextInput({
                          text: i18next.t('namePlaceholder'),
                          className: '',
                          attributes: 'name="name"',
                          type: 'text',
                          value: ''
                          })
                        }
                        <div class="input-message" data-input-message="data-input-message"></div>
                    </div>
                    <div class="form-field disabled form-field-input" data-field-input="data-field-input" data-field-phone="data-field-phone" data-status="field--inactive">
                        <div class="text-style-3-d-fonts-1920-body-medium text-gray-900 space-b-05">
                          ${i18next.t('Your phone')}
                        </div>
                        ${TextInput({
                          text: '',
                          className: '',
                          attributes: 'name="phone"',
                          type: 'text',
                          value: ''
                          })
                        }
                        <div class="input-message" data-input-message="data-input-message"></div>
                    </div>
                    <div class="form-field disabled form-field-input" data-field-input="data-field-input" data-field-mail="data-field-mail" data-status="field--inactive">
                        <div class="text-style-3-d-fonts-1920-body-medium text-gray-900 space-b-05">
                          ${i18next.t('Your email')}
                        </div>
                        ${TextInput({
                          text: i18next.t('emailPlaceholder'),
                          className: '',
                          attributes: 'name="mail"',
                          type: 'text',
                          value: ''
                          })
                        }
                        <div class="input-message" data-input-message="data-input-message"></div>
                    </div>
                    <div class="form-field form-field-input" data-field-input="data-field-input" data-field-message="data-field-message" data-status="field--inactive">
                        <div class="text-style-3-d-fonts-1920-body-medium text-gray-900 space-b-05">
                          ${i18next.t('Your comment')}
                        </div>
                        ${Textarea({
                          text: i18next.t('Type your message'),
                          className: '',
                          attributes: 'name="message"',
                          type: 'text',
                          value: ''
                          })
                        }
                        <div class="input-message" data-input-message="data-input-message"></div>
                    </div>
                  </div>
                  ${ButtonWithoutIcon(
                    '',
                    'data-btn-submit="data-btn-submit"',
                    i18next.t('send'),
                    'secondary',
                    'submit'
                  )}
                  <!--<button class="form__submit" type="submit" >
                    <span class="link__text usn" data-btn-submit-text="data-btn-submit-text">${i18next.t('send')}</span>
                  </button>-->
                </form>
            </div>
        </div>
    `;
  }

  initValidation() {
    const $form = document.querySelector(`#${this._id} form`);
    new FormMonster({
      elements: {
        $form,
        showSuccessMessage: false,
        successAction: () => {
          const title = document.querySelector(`#${this._id} .form__title`);
          const form = document.querySelector(`#${this._id} form`);
          title.dataset.defaultText = title.textContent;

          title.textContent = i18next.t('sendingSuccessTitle');
          form.style.opacity = 0;
          form.style.display = 'none';

          form.insertAdjacentHTML(
            'afterend', 
            ButtonWithoutIcon('','data-form-layout-close data-form-button-after-success-send','Close', "secondary")
          )

          setTimeout(() => {
            document.querySelector(`#${this._id}`).style.visibility = '';
            document.querySelector(`#${this._id}`).style.opacity = '';
            document.querySelectorAll('[data-form-button-after-success-send]').forEach((btn) => {
              btn.remove();
            });
            title.textContent = title.dataset.defaultText;
            gsap.to(title, { y: 0 });
            form.style.opacity = '';
            form.style.display = '';
          }, 5000);
        },
        $btnSubmit: $form.querySelector('[data-btn-submit]'),
        fields: {
          name: {
            inputWrapper: new SexyInput({ animation: 'none', $field: $form.querySelector('[data-field-name]') }),
            rule: yup.string().required(i18next.t('required')).trim(),
            defaultMessage: i18next.t('name'),
            config: this.config,
            valid: false,
            error: [],
          },
          mail: {
            inputWrapper: new SexyInput({ animation: 'none', $field: $form.querySelector('[data-field-mail]') }),
            rule: yup.string().required(i18next.t('required')).trim(),
            config: this.config,
            defaultMessage: i18next.t('mail'),
            valid: false,
            error: [],
          },
          phone: {
            inputWrapper: new SexyInput({
              animation: 'none',
              config: this.config,
              $field: $form.querySelector('[data-field-phone]'),
              typeInput: 'phone',
            }),
            rule: yup
              .string()
              .required(i18next.t('required'))
              .min(17, i18next.t('field_too_short', { cnt: 20 - 8 })),
            defaultMessage: i18next.t('phone'),
            valid: false,
            error: [],
          },
        },
      },
    });
  }
}
