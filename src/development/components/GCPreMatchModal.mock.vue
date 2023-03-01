<template>
  <div id="GamersClubCSApp-modals-matchModal" class="GamersClubCSApp GamersClubCSApp-lobby GamersClubCSApp-matchModal">
    <div class="Toastify" id="gctoast-matchModal"></div>
    <div class="ReactModalPortal">
      <div class="ReactModal__Overlay ReactModal__Overlay--after-open WasdModal__overlay">
        <div class="ReactModal__Content ReactModal__Content--after-open WasdModal__content Modal-amoa4h-0 disUWG"
          tabindex="-1" role="dialog" aria-label="Modal" style="width:100%">
          <div class="WasdCard WasdModal__body MatchModal__body">
            <main class="WasdCardBody WasdModal__cardBody MatchModal__cardBody">
              <div class="Background-ik0cxt-1 jqSJvX">
                <div class="BackgroundOverlay-ik0cxt-2 ePLNJY"></div>
                <div class="BackgroundImage-ik0cxt-3 fUVmEk"></div>
              </div>
              <main id="matchMainContainer" class="Container-ik0cxt-0 bXVWLT">
                <aside class="Sidebar-ik0cxt-4 kTgwKy"
                  style="transition-duration: 1000ms; transition-timing-function: ease; opacity: 1; transform: initial;">
                  <div class="Container-zbgwk2-0 iwdKrI">
                    <div class="HeaderContainer-sc-1a19ih4-0 hJIJLW">
                      <div class="HeaderItems-sc-1a19ih4-1 eYsMTz">
                        <div class="LevelBox-sc-1a19ih4-2 jlsAli">
                          <div
                            class="PlayerLevelBadge PlayerLevelBadge--18 PlayerLevelBadge--size-sm PlayerLevelBadge--nonSubscriber">
                            <div class="PlayerLevelBadge__background" style="background-color: rgb(248, 154, 6);"><span
                                class="PlayerLevelBadge__value">18</span></div>
                          </div>
                        </div>
                        <h2 class="TeamName-sc-1a19ih4-3 kucNpa">Time All Eyez On Me</h2>
                        <div class="Container-sc-1wcvamn-0 kxxpqo">
                          <div class="WasdTooltip__wrapper" aria-expanded="false"><span
                              class="PreVetoes-sc-1wcvamn-1 jHTEoP PreVetoedLabel">3 Pré-vetos</span></div>
                        </div>
                      </div>
                    </div>
                    <ul>
                      <li>
                        <div class="PlayerListCard PlayerListCard--left PlayerListCard--left--ready">
                          <div class="PlayerListCard__readyDetail PlayerListCard__readyDetail--left"></div>
                          <div class="PlayerIdentity PlayerIdentity--horizontal">
                            <div
                              class="PlayerIdentityAvatar PlayerIdentityAvatar--sm PlayerIdentityAvatar--horizontal PlayerIdentityAvatar--horizontal-left PlayerIdentityAvatar--prime">
                              <span class="PlayerIdentityAvatar__frame"
                                style="background-image: url(&quot;undefined&quot;);"></span><svg
                                xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 80 80"
                                fill="none" class="PlayerIdentityAvatar__border">
                                <path
                                  d="M79 40C79 61.5391 61.5391 79 40 79C18.4609 79 1 61.5391 1 40C1 18.4609 18.4609 1 40 1C61.5391 1 79 18.4609 79 40Z"
                                  stroke="url(#paint0_linear)" stroke-width="2"></path>
                                <defs>
                                  <linearGradient id="paint0_linear" x1="40" y1="0" x2="40" y2="80"
                                    gradientUnits="userSpaceOnUse">
                                    <stop stop-color="#00CAFE"></stop>
                                    <stop offset="1" stop-color="#0085FF"></stop>
                                  </linearGradient>
                                </defs>
                              </svg>
                              <div class="WasdAvatar WasdAvatar--withLogo PlayerIdentityAvatar__avatarImage"
                                style="background: none;"><img class="WasdAvatar__image"
                                  src="https://static.gamersclub.com.br/players/avatar/1463580/1463580_medium.jpg">
                              </div><img
                                src="data:image/png;base64,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"
                                class="PlayerIdentityAvatar__primeMedal" alt="Prime Medal">
                            </div>
                            <div class="PlayerIdentity__nicknameBadges PlayerIdentity__nicknameBadges--left">
                              <div class="PlayerIdentityNickname">
                                <div class="PlayerIdentityNickname__userInformations">
                                  <div class="PlayerIdentityNickname__flag PlayerIdentityNickname__flag--left"><img
                                      src="https://gamersclub.com.br/assets/images/flags/24x24/BR.png" alt="Bandeira">
                                  </div>
                                  <div class="PlayerIdentityNickname__nickname"><strong
                                      class="PlayerIdentityNickname__nicknameText">All Eyez On Me</strong></div>
                                </div>
                              </div>
                              <div class="PlayerIdentityBadges PlayerIdentityBadges--left">
                                <div class="WasdTooltip__wrapper PlayerIdentityBadges__featuredMedal"><img
                                    class="PlayerIdentityBadges--sx"
                                    src="https://gamersclub.com.br/images/medalhas/411.png" alt="Featured Medal"></div>
                                <div class="WasdTooltip__wrapper PlayerIdentityBadges__playerRole"><img
                                    class="PlayerIdentityBadges--sx" src="/assets/images/gaming_roles/icon-rifler.svg">
                                </div>
                                <div class="PlayerIdentityBadges__playerLevel">
                                  <div
                                    class="PlayerLevelBadge PlayerLevelBadge--19 PlayerLevelBadge--size-sx PlayerLevelBadge--subscriber">
                                    <div class="PlayerLevelBadge__background"
                                      style="background-image: url(&quot;/assets/images/level/19.svg&quot;);"><span
                                        class="PlayerLevelBadge__value">19</span></div>
                                  </div>
                                </div>
                                <div class="WasdTooltip__wrapper PlayerIdentityBadges__subscription"><img
                                    class="PlayerIdentityBadges--sx"
                                    src="data:image/png;base64,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"
                                    alt="Player Subscription"></div>
                              </div>
                            </div>
                          </div>
                          <div
                            class="PlayerListCard__readyDetail PlayerListCard__readyDetail--right PlayerListCard__readyDetail--right--hidden">
                          </div>
                        </div>
                      </li>
                      <li>
                        <div class="PlayerListCard PlayerListCard--left PlayerListCard--left--ready">
                          <div class="PlayerListCard__readyDetail PlayerListCard__readyDetail--left"></div>
                          <div class="PlayerIdentity PlayerIdentity--horizontal">
                            <div
                              class="PlayerIdentityAvatar PlayerIdentityAvatar--sm PlayerIdentityAvatar--horizontal PlayerIdentityAvatar--horizontal-left PlayerIdentityAvatar--prime">
                              <span class="PlayerIdentityAvatar__frame"
                                style="background-image: url(&quot;undefined&quot;);"></span><svg
                                xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 80 80"
                                fill="none" class="PlayerIdentityAvatar__border">
                                <path
                                  d="M79 40C79 61.5391 61.5391 79 40 79C18.4609 79 1 61.5391 1 40C1 18.4609 18.4609 1 40 1C61.5391 1 79 18.4609 79 40Z"
                                  stroke="url(#paint0_linear)" stroke-width="2"></path>
                                <defs>
                                  <linearGradient id="paint0_linear" x1="40" y1="0" x2="40" y2="80"
                                    gradientUnits="userSpaceOnUse">
                                    <stop stop-color="#00CAFE"></stop>
                                    <stop offset="1" stop-color="#0085FF"></stop>
                                  </linearGradient>
                                </defs>
                              </svg>
                              <div class="WasdAvatar WasdAvatar--withLogo PlayerIdentityAvatar__avatarImage"
                                style="background: none;"><img class="WasdAvatar__image"
                                  src="https://static.gamersclub.com.br/players/avatar/269963/269963_medium.jpg"></div>
                              <img
                                src="data:image/png;base64,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"
                                class="PlayerIdentityAvatar__primeMedal" alt="Prime Medal">
                            </div>
                            <div class="PlayerIdentity__nicknameBadges PlayerIdentity__nicknameBadges--left">
                              <div class="PlayerIdentityNickname">
                                <div class="PlayerIdentityNickname__userInformations">
                                  <div class="PlayerIdentityNickname__flag PlayerIdentityNickname__flag--left"><img
                                      src="https://gamersclub.com.br/assets/images/flags/24x24/BR.png" alt="Bandeira">
                                  </div>
                                  <div class="PlayerIdentityNickname__nickname"><strong
                                      class="PlayerIdentityNickname__nicknameText">w1nteR ?</strong></div>
                                </div>
                              </div>
                              <div class="PlayerIdentityBadges PlayerIdentityBadges--left">
                                <div class="WasdTooltip__wrapper PlayerIdentityBadges__featuredMedal"><img
                                    class="PlayerIdentityBadges--sx"
                                    src="https://gamersclub.com.br/images/medalhas/20.png" alt="Featured Medal"></div>
                                <div class="WasdTooltip__wrapper PlayerIdentityBadges__playerRole"><img
                                    class="PlayerIdentityBadges--sx" src="/assets/images/gaming_roles/icon-support.svg">
                                </div>
                                <div class="PlayerIdentityBadges__playerLevel">
                                  <div
                                    class="PlayerLevelBadge PlayerLevelBadge--19 PlayerLevelBadge--size-sx PlayerLevelBadge--nonSubscriber">
                                    <div class="PlayerLevelBadge__background"
                                      style="background-color: rgb(244, 110, 18);"><span
                                        class="PlayerLevelBadge__value">19</span></div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div
                            class="PlayerListCard__readyDetail PlayerListCard__readyDetail--right PlayerListCard__readyDetail--right--hidden">
                          </div>
                        </div>
                      </li>
                      <li>
                        <div class="PlayerListCard PlayerListCard--left PlayerListCard--left--notReady">
                          <div
                            class="PlayerListCard__readyDetail PlayerListCard__readyDetail--left PlayerListCard__readyDetail--left--hidden">
                          </div>
                          <div class="PlayerIdentity PlayerIdentity--horizontal">
                            <div
                              class="PlayerIdentityAvatar PlayerIdentityAvatar--sm PlayerIdentityAvatar--horizontal PlayerIdentityAvatar--horizontal-left PlayerIdentityAvatar--prime">
                              <span class="PlayerIdentityAvatar__frame"
                                style="background-image: url(&quot;undefined&quot;);"></span><svg
                                xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 80 80"
                                fill="none" class="PlayerIdentityAvatar__border">
                                <path
                                  d="M79 40C79 61.5391 61.5391 79 40 79C18.4609 79 1 61.5391 1 40C1 18.4609 18.4609 1 40 1C61.5391 1 79 18.4609 79 40Z"
                                  stroke="url(#paint0_linear)" stroke-width="2"></path>
                                <defs>
                                  <linearGradient id="paint0_linear" x1="40" y1="0" x2="40" y2="80"
                                    gradientUnits="userSpaceOnUse">
                                    <stop stop-color="#00CAFE"></stop>
                                    <stop offset="1" stop-color="#0085FF"></stop>
                                  </linearGradient>
                                </defs>
                              </svg>
                              <div class="WasdAvatar WasdAvatar--withLogo PlayerIdentityAvatar__avatarImage"
                                style="background: none;"><img class="WasdAvatar__image"
                                  src="https://static.gamersclub.com.br/players/avatar/340558/340558_medium.jpg"></div>
                              <img
                                src="data:image/png;base64,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"
                                class="PlayerIdentityAvatar__primeMedal" alt="Prime Medal">
                            </div>
                            <div class="PlayerIdentity__nicknameBadges PlayerIdentity__nicknameBadges--left">
                              <div class="PlayerIdentityNickname">
                                <div class="PlayerIdentityNickname__userInformations">
                                  <div class="PlayerIdentityNickname__flag PlayerIdentityNickname__flag--left"><img
                                      src="https://gamersclub.com.br/assets/images/flags/24x24/BR.png" alt="Bandeira">
                                  </div>
                                  <div class="PlayerIdentityNickname__nickname"><strong
                                      class="PlayerIdentityNickname__nicknameText">.C8</strong></div>
                                </div>
                              </div>
                              <div class="PlayerIdentityBadges PlayerIdentityBadges--left">
                                <div class="WasdTooltip__wrapper PlayerIdentityBadges__featuredMedal"><img
                                    class="PlayerIdentityBadges--sx"
                                    src="https://gamersclub.com.br/images/medalhas/206.png" alt="Featured Medal"></div>
                                <div class="WasdTooltip__wrapper PlayerIdentityBadges__playerRole"><img
                                    class="PlayerIdentityBadges--sx" src="/assets/images/gaming_roles/icon-igl.svg">
                                </div>
                                <div class="PlayerIdentityBadges__playerLevel">
                                  <div
                                    class="PlayerLevelBadge PlayerLevelBadge--19 PlayerLevelBadge--size-sx PlayerLevelBadge--subscriber">
                                    <div class="PlayerLevelBadge__background"
                                      style="background-image: url(&quot;/assets/images/level/19.svg&quot;);"><span
                                        class="PlayerLevelBadge__value">19</span></div>
                                  </div>
                                </div>
                                <div class="WasdTooltip__wrapper PlayerIdentityBadges__subscription"><img
                                    class="PlayerIdentityBadges--sx"
                                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAABEhSURBVHgB1VppkFzVdf7e2q97eqZnXzTIEkJCIAnJUAjZQSwCxG6TBEIwUAUuiDEmCySlmAquFLFjEjuBUDE7VJIqCIswqwibiJBAg8wmiJCQQCAhaRaNZunpfXlbvnNfz1iDGQxC/uGrunrdT6/vPct3vnPOfdLwOxrZbF8rYP4ddN01tMKtdXUzB/D7MPbseS2eye+9uFhKb88XRsJcfjjMFYb3pLMDl4VhGMNBHhoO4qDVl5pW/KdBGC4NfF+X5UP5E4bQNS3QNP2VYqHwo46OGT04SOOgKNCf7p/RYNk/oZSXBEGgU2KKHQ1+V5uMf9d1PeC3u0M//JfGxs6d+IrjKymwJ7OnuVG3r9F042oK2qVpmrK2TPCz5/oUPICh6+r52u1oY93o4+3b3IpxR0tLSxYHOHQcwLjxxhv1TH7fmU2ms4b2/bHn+11BGIDQUVOsvXXHAP785w/hmp89jK079ypTRXASr4TwPa/bc4N/Mmx/XTrb94dU+oCM+aV/NJjescgxEjfRhGcEgWvwijDwaFmTi2kYShdw1+MbsPKZl1DJjyEo5xFr7sLlF5yJS85ajK6WegR+tHMYRiIYpu7rGlZXK+4Nt99+77s0UPBF5fnCCgwO7uiwY+YK7nkFrdWoaYayaE0KFEsefvnye3jgqXXo7e2FEbMV8EO/Ar9ShlcsYeacufjuRefgj0+ah5hlTxJB18UWYZF+uMPVC//akZw1+EXk+q0K9PX1tVpx9yrLMP/K89w29SNaXWGZfxXLLp7r2Yb7nuxB/8Aw9HgjKC28ahFwi/DdCgLX5azCL+VFVMw66jh8/0/PwnnLjmDc62q9cXF0Xaae4a1bdfh31Nd37jsgBQTnV11z6UmGYd4Tht5sgYcwSmStaNN3tg3g1ofXYfOHu2A1HQIYSQSlDPzyGIUlfNwyP+fh+wxmegGEmgR44AfQ7TosWboMKy5fjoVzpkU0pYhXm9iDynyswf+LhobO50kQ4WfJaXzWzYGR7fOXLFl0Vxj4P/X9aqss6nNzWVuY5pOBNG76r3W484lXkNVb4HQt4o4OAlo98GSWOUtwwgJmdpQxPKbcRRl15bVIxAC7tr2LJ9dsQ+9ogMNmNKOpoW6Cb2ts1kyoXlQq55f88IcrNsfjyaG1a9eGU3qgt/f1FtNOXesHPqkRTYoOxSY1N2dyFTy5bhseeekNuLEG6K0LKXiM1i7AzQzDU5bPEEEjtH4Jl5zwCRbPyeDqW7qjWAlkvRrNMpJDz40UI/Bbpx2OK77D+Fi+AM0NCRVfeg2qsje9kbcs8xeBX7qloaF7+DMV2DOw6TZergm4uASVekCBXceat3fjP554FYMFD86MY4FYC4OzqgI0rJZRzQ7TA3kElRzcwjASwSie+PFmdLWWcMHfHopNexL8tyoD1UJIaNG7/GzySmUMMpkn/xbD4Ucdj6svPhnnnHB4be8oDUZK6OKg+1qa2v9sXGZzfwU810uOx5MoIQts2TGCe554E5t3jyI5cx7i07vhV2mfksDEJbaLkRKhWJQBS0FkzzMWj+Kw6TluGuLq80fx/ZsJD2GukHEgVlXJTYTnPc+voTnAto2rcd3mt/D4iafgLy87GUfN7lBysBKJng/1STJPSmTZwhBG0r3IF0dVwK7euBfX3fUr7ChaSC08FaibQeERMUqlRI4vKiUCUqUSXizru7CDEr53bh839biOh+VLxjCnswjdrMFRLK8spUeRYRoqNgRZupVQcfTKmqfx3RsexOq3B/aPCT43OUVMUiCT24dSOYPRdB/y+TR2j9ALZBd7+jHMnNyE0ocUPqhykh69KpWgwIFcq4VapvVx+tf3YmZnDp4XKnzHYh4uPTsDLYyEFxjJFSbhJF7h1EybDrKUYrrlkBMaKEsFu4d9slgQsVcQMdiUCni0olCeWN/1S4I8LmqrJBRUK3BLVWXhkML7VaHInKLJULnFV1P3i/jOibsQcwJYFrOsLjPA+ScPY0Z7VSAQKcF1JRkaZozTVvCCFikHUc5OwY81Ka+I8KKEUgTh1AoExKIrFg7kWuGCFiqeTcE9BRsITGhtr1xgQBZqTFKp0WdVBeKyI/uxYHauhlflfHWpT1Zx8Wkj3FGMIllXrC7CjkOJ04gjYj0Thl3PsHDokSj/TBi26k9SYFJAyHApRCwWVw/Lxr4fVZh+uawE9KsVdRWrV5lhdUKnDqOkviy6U2lcevx2JBI1N9fyhixk2xrO+cYQtu5KYGtvIwbSMWSLhI+yaqCUCgM3ghehFBgJOsIhKjx43EsXD0ky/ZQHPqUArQJPEZfP4PRJb2VaQasyMMk27dZudDf3o7thCJ31Wcxo3IcZnXm0NlRRV+/DiWmwHWLYiNg5Kq+DyKo09MxDfdx87Q6IM0tFHftGLewZimN7r4Pd+xLoH7aoWBw7BuOoiOL0SL5YRpnGS8TrVAzomv75HpCdyhVi3Ipc71MplaiI99nWq7jy2K2YPS8gxtWjkAwv11DReRiVG5ogRVOltXKAtDCQcpsB7VBJO0RdMkBjSxXz5lZwiicG0/DRlgCPbWjDzsEGhDScYSdZAWgYHR2Bm/To2ToayZ46Bly6SlOYc2FRe0OyrBWHKzUMC7MXP5iFnz/YhO2bQlSrQmmhgnAQaNEMhQh0ToGiMIbU/VEQCvkL0uWePKsoUw/Ub4QsPvnAZ1kRw13PdNHzzQzsOoQJJkvKVS6XkB4bwdDwIIvH8tQKqGoQFhe21MK6bcCK26womWmrHvREM14fOxb//lgT3nwVIKrG4xSmGSoi0o0I/xF7EJBeVCqE4a/vReUBf6NHwbv1LR/3PurgjrUL4bTOo+VZptisapP10GyTcegp6DQ1tvyGyJMgZOmOcr+h25xkAiaeVCqGMcaD7uYYcGWYdSms6Z2H0tPvsVrO4ISzCIt4GGVLPYwyv0CGdBnQwnJPPqtiUwsnlQeSgF9f4+KR/03g6ffnw26cxRxQR/JLqOLQaU7CsovKg4bkDLVKMLUCEuEGqVNXAUjs0w3lih/RJNkmCMhAZCHNMLG+fw52PbQTK/LDOPF0HW3ToDhfIBPUPDLuU4zHgTK9BCJhUQJ6XnBx93NN6OlfBCv1NQUbyQ86DRgSBZ4bEooRpY8RQqJ2Q6p5agVMw8Z4tWgaMdJliOJImlcvyrJCo4STJB0rUY/e0hz82zMhSqVhnHuhCfGwaUawiuoXoWGM31BXuV+t6Fj7VBn3r23Ga3sX0/KHqDU1XZKb0GhMUambIxOWfbWG5KZsLgtLcsdUMaCsBan6Ykg1MAt6NFuGyafIsoDB45NOSQ+KuwNPmhJSXmkWnnsriVIunPDiRGCEWnQiEUYNsHRbMnwG8sb3bawb/AaL2iMU5k1mXXUl85ixFKv0JLN6MFFyl1k8ZrMZjGVGp/aAlNBRFaqrtA26MCxKqcCyolKIKFIm8SBKaDS3QK0tGSKeHC+4aslVAlcwD1VwqoQY7aHBYcJtp7diyRYmq4TKyjqtrpPxIJ/ZrTm8uqxcfSbLsEbHdaTRZH1qagUMQ4KXm5FGJWmwmGTGyfNaVn2tFGrKtrWCSuJBVp7W6CJeXzu+qtUu+wfr/udB459bWwI4RKwrNVFNaBXAoi2/J+sSyLssIaRwlBZU7tU3wHHqpoaQUGi0OT8xjUvi5tmIKhtU7S+xIC5VfBioYHaMKtqbXZYfEV0K3en7Nem1NromeBQX8rm9I0CTnYVBxpGExQ+ETUJh30qk1HdlqDAKZPYqpPIKPj1+o5QQBvBZcebyo1Qoofpbje2hVKH7C67KYX6Po4jWtijzjvOOBPwYm743XqogNxbiuGUWDpljTIJYa7uOFNIYc1IqcjTJvFJGW5FHNNuCUczVPBgoaGcyYyxD3KkVUFUis6Rm6gpCFXKdxrI5lJJZWR4K9yrJ1XBZbxTR2RmoTcTC+UyAt9dW0bM2xJuDKQwXLJyyZQSL5ldwwrcctHVHmbqxhX2wOYpdwqyEjk2rS3Uqrab0GDGLwWyMwzLKAFW2pDz8mloBOl8FnmgrQRzQbSilmQNyAnxleTlZ0GRBKaW5aipWRFOHyYMtJqXny3hjrY/1vQ14a6QLWsNhitfv+XAIRw/uwMZ3hrD42BCLl8eRambuiA0ra1sJybwxtb5gLiRvSkFohvQ+97XoFd2XHlpTMn6OB0Q4jdnPZsGVwKzpBQaNjdxwllbi0X4g5vIiWpcGm892GBl8uNHF4/d5eKM3iU2ZNmT0bhipxogO2bBY8TZs8WZia98ubEzvxDsbB3HcN4E2g+Uz20l5Rqf1dWE1KS/CEop73kQpO4L2BdPUPZ99gE6IV73y1Ao4LDErbNAFPg45fvkxSXT95CLc+d+HYsP6l5lU0oot1HmoL65lhWh7ePAZC6/T4hl0wEy0kQDiKhlFDYEedV5OM7REB96vHomP932Cd57fiqMTe2B3cU3zEGV9iQ0vtxNjuzfha00OzjunA4e2R4fBwkKGQFz7nCAuV6quuE9OmjNZnkIkU1jAFW674WweHy7Afz7Wg+3vvcYVWU4IZ1OB1f0dyFaTMOpamYUTtZbQqAlfy77KwnEFF+m09KY52OYtxQflXYjzfDgmQVwewOiud9CSMPHXf/J1zO10USgUFWz2P+wyNCM/pQLZkdHrk6mGNGnwGraWiTFSieDPpHuXL5mGhYctx/+sn4uVT/dguH9bFLRaJ/sOIxIc4UTQSSchWVsbPwUZP4UQ3mepbvJgzGydA431fbFvA2wvj0tOnYNzl85EMs46iKSRz+fVLBTykgBHTVO/u1Twb5kEe3xqyDn9q7964WjTMP+Ryp9erZSNBhY5uewYcrms+skQmeaJdb1Yv/5tVDKfUIEmWtlRvazgGTWhxepSIqCWadUzUl44jYpLA1a4QXkflsyfgSv/aB66W+ITDWMofXAgCYzhGwSrPt6+8/oLL7zwg0/LO+XhrijS07P6LMsxfuE48Vn7BveqBcWNriuJK4aRooP7Ht+CTW+9SnorKHhoFFqUiHi9Dma8WSVCzYySlEF6FFar5Acwf+50XHX+0Zg/s3Hi3KdajZqqUFXGxkexmH3FypWPr5/qncFvPV7v6XmhnV3QD4LQ/RsGU1LaRMmKMixSX1trJ1a/0Y+HVm3Erg9ep3VTDOQWVVXqqkyg0LHGqFEng3jlUbS3deCyby/CqYunIx4zVOOu1aJTvVPTtSEG4s2GUbnvyCOXjHyefF/4Bcezz65sI56v58HGDxjjjjqnlA+sTRyHGZvwWb9pDA/Ke4LeHQxyJiIqoxkJRYPVwl50d3XjgjMW4ezjD0XCsSb65vFje7IM40+7l9XAzbNnz973ReT6Uq+YBFarVj1wNAPxZ7TVKdWqq4vlUqkWNDJOHB7HjBVdPPriNjy8agPPk9IK6xbL5PPOPB6XnzuXxy/ORHEmu0fCS/7HMzyGvGHevEWbv4xMB/RiTRR59sVfnhMG2j9Uy+VjhB5jzCGJRFL1ERIfH/elcfsj/0cWMyn4EThiZnPtmF5DgSW6NCbyG3pyM0/urr3//kdf/jLvxr6SAuPj2WcfaOABy/dozRUUrt1kJo3ZDmpvFZArFNBGvNfX1UUvu3Ud469iWa70kenuLJe9OxYuXJjGAY6D8qL7qadWzrYTsRW2YV9p2Zbuul7teNJDS0sra/t69ZxkUsuy5I39/cXC2N8vWHDsbnzFcVD/q8FLL636pu3E/5nt31KXB0TjFg9q/9WAwq8zY9qPTvqDM17DQRoH9KJ7qnHaad/a8O7G908vlvJXxR2nV/phCk2qtD9i5Fy+5b0PzzqYwss4qB7Yf7zyyvNd1SC8jodXJt8V37Rs2beH8TsY/w+yu6LEJOCYUQAAAABJRU5ErkJggg=="
                                    alt="Player Subscription"></div>
                              </div>
                            </div>
                          </div>
                          <div
                            class="PlayerListCard__readyDetail PlayerListCard__readyDetail--right PlayerListCard__readyDetail--right--hidden">
                          </div>
                        </div>
                      </li>
                      <li>
                        <div class="PlayerListCard PlayerListCard--left PlayerListCard--left--ready">
                          <div class="PlayerListCard__readyDetail PlayerListCard__readyDetail--left"></div>
                          <div class="PlayerIdentity PlayerIdentity--horizontal">
                            <div
                              class="PlayerIdentityAvatar PlayerIdentityAvatar--sm PlayerIdentityAvatar--horizontal PlayerIdentityAvatar--horizontal-left PlayerIdentityAvatar--prime">
                              <span class="PlayerIdentityAvatar__frame"
                                style="background-image: url(&quot;undefined&quot;);"></span><svg
                                xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 80 80"
                                fill="none" class="PlayerIdentityAvatar__border">
                                <path
                                  d="M79 40C79 61.5391 61.5391 79 40 79C18.4609 79 1 61.5391 1 40C1 18.4609 18.4609 1 40 1C61.5391 1 79 18.4609 79 40Z"
                                  stroke="url(#paint0_linear)" stroke-width="2"></path>
                                <defs>
                                  <linearGradient id="paint0_linear" x1="40" y1="0" x2="40" y2="80"
                                    gradientUnits="userSpaceOnUse">
                                    <stop stop-color="#00CAFE"></stop>
                                    <stop offset="1" stop-color="#0085FF"></stop>
                                  </linearGradient>
                                </defs>
                              </svg>
                              <div class="WasdAvatar WasdAvatar--withLogo PlayerIdentityAvatar__avatarImage"
                                style="background: none;"><img class="WasdAvatar__image"
                                  src="https://static.gamersclub.com.br/players/avatar/579773/579773_medium.jpg"></div>
                              <img
                                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAYfSURBVHgBjVV7bBRVF//dO3ceu9suXdoKBfoCCnwfxU/JZ5EqUYTEgkESE01MNNEYo8ao0ZAYjbHi6w9jjBHiP2qqJBo08RmjqLEW0Wo3BAW1YKjtFqSltN1X9zGzM3OvZ6aFaBT17t6d2XvvOb/z+J1zGf5hRL8sNrCi2sRMo7Oc8yPKkeClSs5zZL9l55P2/a2pv5Nn593pOX4lq1/YDc3YoCQ0KFqr0PRpurNPVqAfl++r1mV3/q5o8t8B9IzUaIsXvOgrfiMTDPrIEYiBTyHGjkNMjEIpDTKxEO7CVXAv3AKvrh0qq6DlsTsWd7rzD8xLnxdg2SnVmBqq7Pd9tOpnfkHs5Ucgjh2cO8ghyRXGgndGDtGHvHKb1qG89VG4xgro0/5QvY6rxp6KnvwTwH9Pqvk/D1UGfIbl1v63EO15HMy1Zw+QViUVvIal9MohxodmRYNNAlFcoHj5DtjLboOe8UdipybWZt9rzQai2lmA7NaHnvHAuiJf7EHVS49SjOkfKfbi9XAv2wY/VoOZm3bBXX8zjPIUnGoCK+XAKwVCkDBGD0Aadahc8L8EVLTZ+/6pt895oL871eHq1QMR/xQi922GssnymlpIz0XlunuBxnZ4roCfLQFeIBIDy1fAU/0wf3gDnCnw8jQgLMxc8wF8Zzm00cxGr6+hbzZEbxY+RlR01b50O1SyF+Wbd8Bbu5msb6I4W2AzZWiTZ6CKNpRH50sCylwM5VtAgTzNnEBkuhdm8knIBZcid8lesF9m+lRf3UZR8+54S94XXfzEICn/PMQzPtwDd/4KmHwU3HaAnw5Cm78YmmfDGZ+AYglgJktsWgNZMaDFqmEMvgrOOfhkkpJ9BG7V6g3RDakGkS1oHTAYIgMfhTFXUkLPTSKx6w4Uuu6h2NfCqo4jv/IGimUcbA2FPCNhJV8AE3HEy8fAvnoBAaUCVgVZN379BO6SCzWZSGzieszsJAbCODMUJiSwQtM0cJpBdSnfRGVGITrQQ+AM0mGwjr0Olp2kww2U5HQowzgRmWZgpLBHZukT0Tu5ZFoNBKVNZkPFwfRiCRS23g3X08CkD2f1NcDYUbDARPpGSz/Dbd5OSiuwEUehbQcxaNGsUUKDcFPkbUAhFeFh6dOUjhOGJ5je1ltR2nwf0NxOGz4lbhXKGx+G+PodxE70o9h2J9wL1sFLp1ARS1FedCeKiVvIW590hrwktpGDwUdliyUQlcuxZvh0QJJCDPQBqUn4v+bAUkPQTucJpxk8m4EcHoKdbQRLezDG+qGIUZhKwyoeoBxI0uHB43WkkBxw/BxRWO8PACpWY2i9JBBx/BuIwT74CzsBcwkwSpWfB6wqysr0OBg1PV2WwBIrIasvgsgloWV6z8n7kf+EjbFY8vq5mS70wvaoNq4KLQipQE8rSKpZB1+rh3nsA1QdeQ68eiX53QLz6C5UT/dAigR80YRY9hUSU6Hy4GnXbCHtNnD4aJKXHmwa02aKB7zFF8OnxhUSjQ6JicMwDr4Of8m1xIBWiqYFZ3iYNvMQnFymQnOi22BNvAY+9XVoWNAIvbor4ZmrIUxjH06vT/GwX0zndjLqcqXtz5JgLAQI6KKfOUTt4HuUa7dARS6FV15EFrfBN9uQdrZAdzPg6cOY64fU9AxUVj1NxADqGrXuYD0E8Ha39fF8Ya9X1YrSpifmWiR1T2rBKj8MUSigFFsLcepJ6KnnYevbaG0McmKQkrF6rsgUnJXdcLwm6CbbfXqPkfzjfXDLFzVsUfshZcZbq354FcaXOyHdMvzoUqJfFNw0oc0cCo+65sVQLoXEPQmNTYEZVbDJcrvmBpgGhpa1G+sGH2PpP1042L6/UW//f69bEcv1zAhi33WDjXx27uJQvz+rZhe9+HoUVzwDqVMHZd7Ignp2xVjPX1w458b6ffNxUcfjTMTuDjqnSB+FfvJ9aNM/QvOnKdZUTPHl5MVSOPOuhquvCYtLeOW9MTNz19mL5vwAZ8f1wx3Mqt1Joe2CZoWJO1v1ofXh5e/7LJc7YDqFnfa3bX1/peb8AHPDWvVNi93W0iGU1ik1fR6THKpcKAvB+oWqfF76pGX87+R/A7qA10Xbzq60AAAAAElFTkSuQmCC"
                                class="PlayerIdentityAvatar__primeMedal" alt="Prime Medal">
                            </div>
                            <div class="PlayerIdentity__nicknameBadges PlayerIdentity__nicknameBadges--left">
                              <div class="PlayerIdentityNickname">
                                <div class="PlayerIdentityNickname__userInformations">
                                  <div class="PlayerIdentityNickname__flag PlayerIdentityNickname__flag--left"><img
                                      src="https://gamersclub.com.br/assets/images/flags/24x24/BR.png" alt="Bandeira">
                                  </div>
                                  <div class="PlayerIdentityNickname__nickname"><strong
                                      class="PlayerIdentityNickname__nicknameText">mooN</strong></div>
                                </div>
                              </div>
                              <div class="PlayerIdentityBadges PlayerIdentityBadges--left">
                                <div class="WasdTooltip__wrapper PlayerIdentityBadges__featuredMedal"><img
                                    class="PlayerIdentityBadges--sx"
                                    src="https://gamersclub.com.br/images/medalhas/88.png" alt="Featured Medal"></div>
                                <div class="WasdTooltip__wrapper PlayerIdentityBadges__playerRole"><img
                                    class="PlayerIdentityBadges--sx"
                                    src="/assets/images/gaming_roles/icon-entry_fragger.svg"></div>
                                <div class="PlayerIdentityBadges__playerLevel">
                                  <div
                                    class="PlayerLevelBadge PlayerLevelBadge--19 PlayerLevelBadge--size-sx PlayerLevelBadge--subscriber">
                                    <div class="PlayerLevelBadge__background"
                                      style="background-image: url(&quot;/assets/images/level/19.svg&quot;);"><span
                                        class="PlayerLevelBadge__value">19</span></div>
                                  </div>
                                </div>
                                <div class="WasdTooltip__wrapper PlayerIdentityBadges__subscription"><img
                                    class="PlayerIdentityBadges--sx"
                                    src="data:image/png;base64,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"
                                    alt="Player Subscription"></div>
                              </div>
                            </div>
                          </div>
                          <div
                            class="PlayerListCard__readyDetail PlayerListCard__readyDetail--right PlayerListCard__readyDetail--right--hidden">
                          </div>
                        </div>
                      </li>
                      <li>
                        <div class="PlayerListCard PlayerListCard--left PlayerListCard--left--ready">
                          <div class="PlayerListCard__readyDetail PlayerListCard__readyDetail--left"></div>
                          <div class="PlayerIdentity PlayerIdentity--horizontal">
                            <div
                              class="PlayerIdentityAvatar PlayerIdentityAvatar--sm PlayerIdentityAvatar--horizontal PlayerIdentityAvatar--horizontal-left PlayerIdentityAvatar--prime">
                              <span class="PlayerIdentityAvatar__frame"
                                style="background-image: url(&quot;undefined&quot;);"></span><svg
                                xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 80 80"
                                fill="none" class="PlayerIdentityAvatar__border">
                                <path
                                  d="M79 40C79 61.5391 61.5391 79 40 79C18.4609 79 1 61.5391 1 40C1 18.4609 18.4609 1 40 1C61.5391 1 79 18.4609 79 40Z"
                                  stroke="url(#paint0_linear)" stroke-width="2"></path>
                                <defs>
                                  <linearGradient id="paint0_linear" x1="40" y1="0" x2="40" y2="80"
                                    gradientUnits="userSpaceOnUse">
                                    <stop stop-color="#00CAFE"></stop>
                                    <stop offset="1" stop-color="#0085FF"></stop>
                                  </linearGradient>
                                </defs>
                              </svg>
                              <div class="WasdAvatar WasdAvatar--withLogo PlayerIdentityAvatar__avatarImage"
                                style="background: none;"><img class="WasdAvatar__image"
                                  src="https://static.gamersclub.com.br/players/avatar/731972/731972_medium.jpg"></div>
                              <img
                                src="data:image/png;base64,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"
                                class="PlayerIdentityAvatar__primeMedal" alt="Prime Medal">
                            </div>
                            <div class="PlayerIdentity__nicknameBadges PlayerIdentity__nicknameBadges--left">
                              <div class="PlayerIdentityNickname">
                                <div class="PlayerIdentityNickname__userInformations">
                                  <div class="PlayerIdentityNickname__flag PlayerIdentityNickname__flag--left"><img
                                      src="https://gamersclub.com.br/assets/images/flags/24x24/BR.png" alt="Bandeira">
                                  </div>
                                  <div class="PlayerIdentityNickname__nickname"><strong
                                      class="PlayerIdentityNickname__nicknameText">hard</strong></div>
                                </div>
                              </div>
                              <div class="PlayerIdentityBadges PlayerIdentityBadges--left">
                                <div class="WasdTooltip__wrapper PlayerIdentityBadges__featuredMedal"><img
                                    class="PlayerIdentityBadges--sx"
                                    src="https://gamersclub.com.br/images/medalhas/709.png" alt="Featured Medal"></div>
                                <div class="WasdTooltip__wrapper PlayerIdentityBadges__playerRole"><img
                                    class="PlayerIdentityBadges--sx" src="/assets/images/gaming_roles/icon-lurker.svg">
                                </div>
                                <div class="PlayerIdentityBadges__playerLevel">
                                  <div
                                    class="PlayerLevelBadge PlayerLevelBadge--18 PlayerLevelBadge--size-sx PlayerLevelBadge--nonSubscriber">
                                    <div class="PlayerLevelBadge__background"
                                      style="background-color: rgb(248, 154, 6);"><span
                                        class="PlayerLevelBadge__value">18</span></div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div
                            class="PlayerListCard__readyDetail PlayerListCard__readyDetail--right PlayerListCard__readyDetail--right--hidden">
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </aside>
                <section id="mainContent" class="MainContent-ik0cxt-5 eFxAkN">
                  <div class="Content-ik0cxt-6 QrzPd">
                    <header class="Header-ik0cxt-7 clwHGa"
                      style="transition-duration: 2000ms; transition-timing-function: ease; opacity: 1;">
                      <h1 class="HeaderTitle-ik0cxt-8 iVmoep">
                        <div class="Main-sc-1d463vn-0 bgYqyF">
                          <div class="Container-sc-1d463vn-1 gpPaJw"><svg width="156" height="24" viewBox="0 0 156 24"
                              fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path fill-rule="evenodd" clip-rule="evenodd"
                                d="M114.555 4.10798C115.455 4.10798 116.23 4.25798 116.879 4.55398C117.448 4.81398 117.996 5.19398 118.525 5.69198L118.75 5.91198L116.925 7.16998L116.729 6.99898C116.501 6.80237 116.252 6.63073 115.988 6.48698C115.603 6.28598 115.125 6.18498 114.555 6.18498C114.115 6.18498 113.701 6.26498 113.313 6.42498C112.925 6.58498 112.597 6.80998 112.329 7.10098C112.129 7.32298 111.979 7.54198 111.876 7.75698C111.772 7.97198 111.686 8.25898 111.617 8.61698C111.541 9.03661 111.495 9.46095 111.478 9.88698C111.454 10.376 111.443 11.027 111.443 11.839C111.443 13.359 111.499 14.427 111.613 15.041C111.726 15.655 111.965 16.168 112.329 16.577C112.597 16.862 112.925 17.086 113.313 17.249C113.701 17.412 114.115 17.493 114.555 17.493C115.125 17.493 115.603 17.393 115.988 17.191C116.226 17.066 116.476 16.893 116.738 16.671L116.937 16.497L118.75 17.767C118.386 18.137 117.994 18.46 117.575 18.737C117.156 19.012 116.702 19.22 116.215 19.36C115.728 19.5 115.174 19.57 114.555 19.57C114.033 19.57 113.54 19.508 113.076 19.387C112.607 19.2634 112.158 19.0757 111.741 18.829C111.327 18.5876 110.946 18.2931 110.608 17.953C110.14 17.466 109.804 16.948 109.598 16.398C109.386 15.8229 109.257 15.2205 109.216 14.609C109.166 13.8043 109.142 12.9982 109.145 12.192V11.502C109.147 10.734 109.159 10.112 109.18 9.63798C109.204 9.09498 109.259 8.59798 109.345 8.14598C109.431 7.69398 109.572 7.27198 109.768 6.87798C109.963 6.48598 110.243 6.10098 110.608 5.72598C111.115 5.20791 111.721 4.79798 112.391 4.52098C113.078 4.24215 113.813 4.1018 114.555 4.10798ZM134.157 4.16698V14.138C134.157 14.806 134.284 15.388 134.539 15.885C134.793 16.383 135.154 16.765 135.622 17.033C136.089 17.3 136.636 17.434 137.262 17.434C137.887 17.434 138.435 17.3 138.906 17.033C139.377 16.765 139.742 16.384 140 15.891C140.257 15.397 140.386 14.813 140.386 14.138V4.16698H142.666V14.25C142.666 15.28 142.432 16.195 141.964 16.996C141.496 17.797 140.852 18.416 140.031 18.854C139.209 19.292 138.286 19.512 137.261 19.512C136.244 19.512 135.326 19.292 134.508 18.854C133.703 18.4286 133.034 17.7846 132.579 16.996C132.111 16.196 131.878 15.281 131.878 14.25V4.16698H134.157ZM123.103 4.16698V17.417H130.403V19.512H120.784V4.16698H123.103ZM83.3559 4.16698V7.52398H76.7739V10.092H82.3999V13.449H76.7749V16.154H83.3569V19.512H73.0519V4.16698H83.3559ZM60.5889 4.16698L63.9889 10.934L67.3999 4.16698H71.0599V19.512H67.3379V12.165L65.1849 15.955H62.8039L60.6519 12.165V19.512H56.9289V4.16698H60.5889ZM50.9439 4.16698L56.4539 19.512H52.5659L51.8589 17.228H47.1899L46.4519 19.512H42.5519L48.0639 4.16698H50.9439ZM36.8439 4.16698C37.9059 4.16698 38.7729 4.30498 39.4439 4.58098C40.1139 4.85698 40.7839 5.34098 41.4519 6.03098L38.5009 8.10898L38.3559 7.98998C38.2283 7.88637 38.0921 7.7937 37.9489 7.71298C37.6519 7.55098 37.2819 7.46998 36.8389 7.46998C36.2109 7.46998 35.7309 7.68998 35.3959 8.13298C35.2638 8.30996 35.1621 8.50766 35.0949 8.71798C35.0159 8.94798 34.9569 9.30398 34.9149 9.78398C34.8749 10.264 34.8549 10.949 34.8549 11.839V12.129C34.8589 12.879 34.8789 13.47 34.9149 13.899C34.9569 14.383 35.0159 14.742 35.0949 14.976C35.1729 15.211 35.2729 15.408 35.3959 15.566C35.7239 15.995 36.2049 16.209 36.8389 16.209C37.1999 16.209 37.4949 16.159 37.7239 16.059C37.9519 15.959 38.1619 15.809 38.3529 15.609C38.5369 15.429 38.6729 15.187 38.7619 14.883C38.8509 14.58 38.8949 14.273 38.8949 13.962V13.786H36.8389V10.69H42.5369V12.73C42.5369 13.986 42.4289 15.002 42.2149 15.779C42.0142 16.5309 41.6213 17.2178 41.0749 17.772C39.9509 18.932 38.5399 19.512 36.8439 19.512C35.1879 19.512 33.8089 18.946 32.7039 17.813C32.0509 17.151 31.6339 16.398 31.4579 15.557C31.2809 14.714 31.1919 13.644 31.1919 12.347V11.332C31.1919 10.034 31.2809 8.96198 31.4579 8.11698C31.6349 7.27198 32.0509 6.51698 32.7049 5.85498C33.2699 5.28198 33.8799 4.85698 34.5339 4.58098C35.1879 4.30498 35.9569 4.16698 36.8439 4.16698ZM151.144 4.16698C152.059 4.16698 152.866 4.33698 153.564 4.67698C154.261 5.01698 154.795 5.50498 155.166 6.13998C155.537 6.77498 155.723 7.51698 155.723 8.36598C155.728 8.8664 155.631 9.36257 155.437 9.82398C155.262 10.2455 155.006 10.6282 154.683 10.95C154.396 11.2388 154.053 11.466 153.675 11.618C154.326 11.87 154.87 12.302 155.307 12.913C155.744 13.523 155.962 14.277 155.962 15.175C155.962 16.102 155.769 16.889 155.384 17.538C155.005 18.182 154.439 18.6956 153.761 19.011C153.064 19.345 152.267 19.511 151.372 19.511H145.232V4.16698H151.144ZM102.642 4.16698C103.74 4.16698 104.7 4.30998 105.522 4.59698C106.252 4.85098 106.901 5.24098 107.467 5.76498L107.675 5.96898L104.915 7.91198C104.679 7.74834 104.414 7.63 104.135 7.56298C103.693 7.45898 103.161 7.40798 102.54 7.40798C101.954 7.40798 101.507 7.54898 101.2 7.83198C100.893 8.11498 100.74 8.43998 100.74 8.80498C100.74 9.07498 100.839 9.30898 101.036 9.50898C101.235 9.71098 101.514 9.84898 101.873 9.92298L102.059 9.95498L103.859 10.203C105.169 10.397 106.148 10.814 106.796 11.456C107.184 11.836 107.466 12.296 107.639 12.838C107.813 13.38 107.9 14.024 107.9 14.769C107.9 15.757 107.643 16.609 107.128 17.326C106.613 18.045 105.918 18.589 105.041 18.957C104.165 19.327 103.198 19.511 102.141 19.511C100.907 19.511 99.8329 19.363 98.9189 19.066C98.0995 18.7982 97.3498 18.3518 96.7239 17.759L96.4839 17.524L99.3119 15.526C99.5939 15.707 99.9199 15.85 100.29 15.955C100.89 16.125 101.514 16.208 102.162 16.208C103.587 16.208 104.3 15.757 104.3 14.852C104.3 14.466 104.2 14.169 104.003 13.962C103.833 13.784 103.569 13.66 103.209 13.589L103.021 13.558L101.221 13.299C99.8979 13.113 98.8989 12.667 98.2229 11.963C97.5409 11.253 97.1999 10.241 97.1999 8.92998C97.1999 8.01198 97.4199 7.19198 97.8599 6.46998C98.2999 5.74998 98.9299 5.18498 99.7529 4.77798C100.574 4.37098 101.538 4.16698 102.643 4.16698H102.642ZM90.9369 4.16698C92.0239 4.16698 92.9559 4.39698 93.7309 4.85698C94.5069 5.31598 95.0969 5.92098 95.5019 6.67198C95.9079 7.42198 96.1099 8.23198 96.1099 9.10198C96.1099 10.064 95.8699 10.887 95.3899 11.571C94.9099 12.255 94.3269 12.769 93.6419 13.113L96.9109 19.511H92.6059L89.9159 13.797H88.6549V19.511H84.9319V4.16698H90.9369ZM151.169 12.744H147.55V17.417H151.169C151.689 17.417 152.136 17.317 152.51 17.117C152.884 16.917 153.168 16.642 153.363 16.291C153.557 15.941 153.653 15.533 153.653 15.071C153.653 14.601 153.557 14.193 153.363 13.849C153.163 13.5001 152.865 13.2183 152.505 13.039C152.127 12.843 151.682 12.744 151.169 12.744ZM49.6029 9.98698L48.2399 14.08H50.8799L49.6029 9.98698ZM150.95 6.25998H147.55V10.649H150.95C151.713 10.649 152.316 10.456 152.76 10.071C153.203 9.68698 153.425 9.14698 153.425 8.45398C153.425 7.99998 153.323 7.60598 153.118 7.27398C152.913 6.94064 152.613 6.67681 152.256 6.51698C151.884 6.34698 151.45 6.25998 150.95 6.25998ZM90.7719 7.55598H88.6549V10.65H90.7719C91.0979 10.65 91.3849 10.578 91.6319 10.435C91.8682 10.3019 92.063 10.106 92.1949 9.86898C92.3229 9.63398 92.3879 9.38098 92.3879 9.10798C92.3879 8.83498 92.3229 8.57998 92.1949 8.34298C92.0646 8.10327 91.8695 7.90505 91.6319 7.77098C91.3697 7.62348 91.0727 7.54922 90.7719 7.55598Z"
                                fill="#FFFFFE"></path>
                              <path fill-rule="evenodd" clip-rule="evenodd"
                                d="M22.5039 7.302L11.8709 14.792H18.0619C16.9559 17.231 14.5219 18.924 11.6969 18.924C10.2873 18.926 8.9107 18.4968 7.75194 17.694L3.74194 20.518C5.8927 22.5487 8.73901 23.6793 11.6969 23.678C18.1569 23.678 23.3939 18.378 23.3939 11.838C23.3939 10.231 23.0779 8.698 22.5039 7.302Z"
                                fill="#308CF4"></path>
                              <path fill-rule="evenodd" clip-rule="evenodd"
                                d="M21.278 5.046L17.423 7.761C16.156 5.941 14.064 4.753 11.697 4.753C7.83103 4.753 4.69703 7.925 4.69703 11.838C4.69703 13.331 5.15203 14.715 5.93103 15.856L2.07603 18.571C0.718589 16.5885 -0.00530352 14.2407 2.92533e-05 11.838C2.92533e-05 5.3 5.23803 0 11.697 0C15.66 0 19.163 1.994 21.277 5.046"
                                fill="#FFFFFE"></path>
                            </svg></div>
                        </div>
                      </h1>
                      <div class="HeaderButtons-ik0cxt-12 hzhICX"></div>
                    </header>
                    <section class="Steps-ik0cxt-10 cDjkgG"
                      style="transition-duration: 2000ms; transition-timing-function: ease; opacity: 1;">
                      <ul class="List-sc-1pddyt2-0 ibnOeK">
                        <li class="Item-sc-1pddyt2-1 jAXFQW">Ready</li>
                        <li class="Item-sc-1pddyt2-1 xUyyy">Veto de mapas</li>
                        <li class="Item-sc-1pddyt2-1 xUyyy">Jogar</li>
                      </ul>
                    </section>
                    <section class="Main-ik0cxt-11 dECNNx">
                      <div class="Wrapper-sc-82h9oz-0 bYrovz"
                        style="transition-duration: 1000ms; transition-timing-function: ease; will-change: transform; opacity: 1; transform: translateY(0px);">
                        <div class="Container-sc-82h9oz-1 jYNaSV">
                          <h2 class="Title-sc-82h9oz-2 jEeYuu">Confirme sua presença</h2>
                          <h3 class="SubTitle-sc-82h9oz-3 eAobQP">Aguardando jogadores...</h3>
                          <div class="Container-sc-1dsm8t7-0 jZlGSp">
                            <ul>
                              <li class="Dot-sc-1dsm8t7-1 gGitME"></li>
                              <li class="Dot-sc-1dsm8t7-1 gGitME"></li>
                              <li class="Dot-sc-1dsm8t7-1 gGitME"></li>
                              <li class="Dot-sc-1dsm8t7-1 gGitME"></li>
                              <li class="Dot-sc-1dsm8t7-1 gGitME"></li>
                              <li class="Dot-sc-1dsm8t7-1 gGitME"></li>
                              <li class="Dot-sc-1dsm8t7-1 gGitME"></li>
                              <li class="Dot-sc-1dsm8t7-1 gGitME"></li>
                              <li class="Dot-sc-1dsm8t7-1 gGitME"></li>
                              <li class="Dot-sc-1dsm8t7-1 kHeff"></li>
                            </ul>
                          </div><button class="WasdButton WasdButton--success WasdButton--lg" type="button"
                            history="[object Object]">
                            <div class="ButtonIcon-sc-82h9oz-4 jZvxbB"><svg width="24" height="24" viewBox="0 0 24 24"
                                fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd"
                                  d="M16.8976 5.8343C16.8656 5.85056 16.829 5.86627 16.7774 5.87599C16.548 6.20078 16.6864 6.16263 16.2819 6.43394C16.2828 6.97823 16.2983 7.03676 16.426 7.51897C16.4291 7.53057 16.4275 7.54179 16.4211 7.55188C16.4149 7.56198 16.4058 7.56871 16.394 7.57114C16.2963 7.59208 16.1558 7.62817 16.0743 7.6435C16.0769 7.6607 16.1156 7.96885 16.0719 8.19827C16.0035 8.55858 15.1466 9.34707 14.942 9.38745C14.6589 9.44317 14.3426 9.19299 13.848 8.97591C13.7116 8.91589 13.2542 8.61504 13.0146 8.53502C12.816 8.46883 12.6168 8.95273 12.8635 9.08249C12.9784 9.14288 13.1617 9.22422 13.2196 9.37436C13.3911 9.81937 13.1925 11.5357 12.839 11.8808C12.6712 11.8795 12.5299 11.7254 12.4053 11.7656C12.1828 11.8875 12.3237 12.5683 12.4053 12.6869C13.7744 14.0963 13.6118 15.14 14.1931 15.9194C14.4582 15.9194 14.2843 16.2004 14.4851 16.5306C14.5388 16.7002 14.4698 16.9881 14.4409 17.0973C14.4409 17.2391 14.4409 17.3808 14.4409 17.5225C14.4263 17.5668 14.4115 17.611 14.3966 17.6553C14.3966 17.7794 14.3966 17.9034 14.3966 18.0274C14.356 18.2085 14.3112 18.4514 14.2729 18.6206C14.1918 18.9778 14.5055 19.2553 14.317 19.595C14.317 19.8038 14.3177 19.7621 14.1931 19.9316C14.1931 20.2558 14.1169 20.939 14.1931 21.1804C14.2462 21.3483 14.8547 22.0599 15.0074 22.128C15.3753 22.292 15.9177 22.2566 15.7419 22.8366C14.6649 23.1674 13.9773 22.65 13.4035 22.6416L13.3764 22.7403C13.009 22.7409 12.7153 22.6504 12.6353 22.624C12.6348 22.5246 12.7542 21.7628 12.7947 21.6409C12.836 21.5758 12.8775 21.511 12.9186 21.4461C12.9632 21.3163 12.8732 20.3648 12.8655 20.1086C12.6361 19.94 12.5912 19.4258 12.5912 19.1432C12.5251 18.9247 12.5249 18.6655 12.5116 18.3815C12.5053 18.2484 12.4259 18.0528 12.4761 17.8856C12.5103 17.7716 12.6389 17.7218 12.6708 17.6287C12.6708 17.5225 12.6708 17.4161 12.6708 17.3099C12.7314 16.9745 12.7125 16.8199 12.5116 16.6192C12.0081 16.6258 11.9386 16.6499 11.6618 16.2206C11.5759 16.0871 10.8714 14.9749 10.8034 14.9452C10.2173 14.6892 10.3339 14.7889 10.0775 14.3342C10.0671 14.3343 9.91104 14.3863 9.77314 14.5928C9.56349 14.9063 9.19222 15.9253 9.08628 16.2827C9.02723 16.482 9.08665 16.7022 8.9979 16.8672C8.93362 16.9865 8.72435 17.0248 8.67932 17.1063C8.47378 17.4765 8.62774 17.4477 8.23667 17.7084C8.16622 17.7992 8.16417 17.9356 8.11278 18.0449C8.08326 18.0864 8.05374 18.1278 8.02422 18.1691C7.95844 18.3104 8.0941 18.5679 8.0685 18.6562C8.00086 18.8882 7.91155 19.1223 7.82074 19.3381C7.64136 19.7638 7.66472 20.3291 7.48403 20.5908C7.39322 20.7223 7.17367 20.594 7.00644 20.7021C6.99672 20.7935 6.73102 21.4012 6.67908 21.57C6.67908 21.8918 6.67908 22.2136 6.67908 22.5354C6.72897 22.6981 6.86611 22.8531 6.82519 23.059C6.78184 23.2783 6.01949 23.2747 5.60581 23.2153C5.32889 23.1753 5.24593 22.9711 5.25041 22.7349C5.25583 22.4561 5.81919 20.6451 5.785 20.5248C5.35729 20.0434 5.89953 19.5479 6.05948 19.0989C6.1374 18.8802 6.08956 18.5748 6.17458 18.3727C6.32499 18.0982 6.47541 17.8236 6.62601 17.5491C6.90031 17.2897 6.77811 17.2766 6.92684 17.0442C7.05577 16.8427 7.21216 16.7067 7.12154 16.3978C6.93917 15.7763 7.33436 14.8957 7.36052 14.2455C7.29045 14.1717 7.05278 14.195 7.02288 13.9969C6.96234 13.5934 7.17573 12.8787 7.30727 12.8108C7.36575 12.7806 7.43246 12.8075 7.4844 12.7753C7.48422 12.4726 7.18357 10.7881 7.41209 10.7028C7.55298 10.6503 7.87679 10.6226 7.93901 10.5944C7.93528 10.5226 7.88595 10.3693 7.82653 10.361C7.72619 10.347 7.52028 10.3081 7.35641 10.2704C6.85341 10.1543 7.31885 8.1691 7.32502 8.16106C7.46348 7.97819 8.10568 8.22482 8.1836 7.91294C8.39829 7.63883 8.01805 6.58408 8.75069 5.28551C8.99808 4.84686 9.47194 4.40391 10.0245 4.59182C10.2098 4.65465 10.0973 4.92109 10.4228 4.63614C10.431 4.46991 10.3539 4.33061 10.3077 4.19319C9.7666 2.57788 11.5998 1.70263 12.8833 2.62556C13.0275 2.68408 13.1114 2.71306 13.2196 2.79384C13.2902 3.15957 13.6525 3.81025 13.2902 4.2375C13.1422 4.2691 12.9606 4.35212 12.8478 4.43233C12.8459 4.58004 12.865 4.71598 12.8921 4.80423C12.9163 4.8837 12.9627 4.91511 12.8433 4.96372C12.8283 4.96971 12.8347 5.01926 12.8429 5.03777C13.1424 5.09685 13.4618 4.98242 13.6621 4.90165H13.9012V4.60024H14.0154V4.3639H14.1296V4.77226H14.428V4.90165H18.852V5.13163H19.0479V4.29041H19.2123V4.97438H19.5888V5.36498H20.76V5.24887H20.955V5.29991H21.5083V5.62544H20.955V5.67649H20.76V5.56037H19.5888V5.67667C19.4169 5.67667 19.245 5.67667 19.0731 5.67667V5.59796H18.852V5.8343H16.8976Z"
                                  fill="white"></path>
                              </svg></div>Ready
                          </button>
                          <div class="Container-sc-14359bc-0 hWSHgm"><span class="Title-sc-14359bc-1 hBHvLE">Tempo
                              restante</span>
                            <div class="Countdown-sc-14359bc-2 fgZrXC"><span
                                class="ReadyBoxTimeRemaining__timeContainer--time">00:19</span></div>
                          </div>
                        </div>
                      </div>
                    </section>
                  </div>
                </section>
                <aside class="Sidebar-ik0cxt-4 jblXjp"
                  style="transition-duration: 1000ms; transition-timing-function: ease; opacity: 1; transform: initial;">
                  <div class="Container-zbgwk2-0 iwdKrI">
                    <div class="HeaderContainer-sc-1a19ih4-0 hJIJLW">
                      <div class="HeaderItems-sc-1a19ih4-1 eYsMTz">
                        <div class="LevelBox-sc-1a19ih4-2 jlsAli">
                          <div
                            class="PlayerLevelBadge PlayerLevelBadge--19 PlayerLevelBadge--size-sm PlayerLevelBadge--nonSubscriber">
                            <div class="PlayerLevelBadge__background" style="background-color: rgb(244, 110, 18);"><span
                                class="PlayerLevelBadge__value">19</span></div>
                          </div>
                        </div>
                        <h2 class="TeamName-sc-1a19ih4-3 kucNpa">Time Kid Ben Bala</h2>
                        <div class="Container-sc-1wcvamn-0 kxxpqo">
                          <div class="WasdTooltip__wrapper" aria-expanded="false"><span
                              class="PreVetoes-sc-1wcvamn-1 jHTEoP PreVetoedLabel">3 Pré-vetos</span></div>
                        </div>
                      </div>
                    </div>
                    <ul>
                      <li>
                        <div class="PlayerListCard PlayerListCard--right PlayerListCard--right--ready">
                          <div
                            class="PlayerListCard__readyDetail PlayerListCard__readyDetail--left PlayerListCard__readyDetail--left--hidden">
                          </div>
                          <div class="PlayerIdentity PlayerIdentity--horizontal">
                            <div class="PlayerIdentity__nicknameBadges PlayerIdentity__nicknameBadges--right">
                              <div class="PlayerIdentityNickname">
                                <div class="PlayerIdentityNickname__userInformations">
                                  <div class="PlayerIdentityNickname__flag PlayerIdentityNickname__flag--right"><img
                                      src="https://gamersclub.com.br/assets/images/flags/24x24/BR.png" alt="Bandeira">
                                  </div>
                                  <div class="PlayerIdentityNickname__nickname"><strong
                                      class="PlayerIdentityNickname__nicknameText">Kid Ben Bala</strong></div>
                                </div>
                              </div>
                              <div class="PlayerIdentityBadges PlayerIdentityBadges--right">
                                <div class="WasdTooltip__wrapper PlayerIdentityBadges__featuredMedal"><img
                                    class="PlayerIdentityBadges--sx"
                                    src="https://gamersclub.com.br/images/medalhas/81.png" alt="Featured Medal"></div>
                                <div class="WasdTooltip__wrapper PlayerIdentityBadges__playerRole"><img
                                    class="PlayerIdentityBadges--sx" src="/assets/images/gaming_roles/icon-rifler.svg">
                                </div>
                                <div class="PlayerIdentityBadges__playerLevel">
                                  <div
                                    class="PlayerLevelBadge PlayerLevelBadge--19 PlayerLevelBadge--size-sx PlayerLevelBadge--subscriber">
                                    <div class="PlayerLevelBadge__background"
                                      style="background-image: url(&quot;/assets/images/level/19.svg&quot;);"><span
                                        class="PlayerLevelBadge__value">19</span></div>
                                  </div>
                                </div>
                                <div class="WasdTooltip__wrapper PlayerIdentityBadges__subscription"><img
                                    class="PlayerIdentityBadges--sx"
                                    src="data:image/png;base64,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"
                                    alt="Player Subscription"></div>
                              </div>
                            </div>
                            <div
                              class="PlayerIdentityAvatar PlayerIdentityAvatar--sm PlayerIdentityAvatar--horizontal PlayerIdentityAvatar--horizontal-right PlayerIdentityAvatar--prime">
                              <span class="PlayerIdentityAvatar__frame"
                                style="background-image: url(&quot;undefined&quot;);"></span><svg
                                xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 80 80"
                                fill="none" class="PlayerIdentityAvatar__border">
                                <path
                                  d="M79 40C79 61.5391 61.5391 79 40 79C18.4609 79 1 61.5391 1 40C1 18.4609 18.4609 1 40 1C61.5391 1 79 18.4609 79 40Z"
                                  stroke="url(#paint0_linear)" stroke-width="2"></path>
                                <defs>
                                  <linearGradient id="paint0_linear" x1="40" y1="0" x2="40" y2="80"
                                    gradientUnits="userSpaceOnUse">
                                    <stop stop-color="#00CAFE"></stop>
                                    <stop offset="1" stop-color="#0085FF"></stop>
                                  </linearGradient>
                                </defs>
                              </svg>
                              <div class="WasdAvatar WasdAvatar--withLogo PlayerIdentityAvatar__avatarImage"
                                style="background: none;"><img class="WasdAvatar__image"
                                  src="https://static.gamersclub.com.br/players/avatar/637515/637515_medium.jpg"></div>
                              <img
                                src="data:image/png;base64,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"
                                class="PlayerIdentityAvatar__primeMedal" alt="Prime Medal">
                            </div>
                          </div>
                          <div class="PlayerListCard__readyDetail PlayerListCard__readyDetail--right"></div>
                        </div>
                      </li>
                      <li>
                        <div class="PlayerListCard PlayerListCard--right PlayerListCard--right--ready">
                          <div
                            class="PlayerListCard__readyDetail PlayerListCard__readyDetail--left PlayerListCard__readyDetail--left--hidden">
                          </div>
                          <div class="PlayerIdentity PlayerIdentity--horizontal">
                            <div class="PlayerIdentity__nicknameBadges PlayerIdentity__nicknameBadges--right">
                              <div class="PlayerIdentityNickname">
                                <div class="PlayerIdentityNickname__userInformations">
                                  <div class="PlayerIdentityNickname__flag PlayerIdentityNickname__flag--right"><img
                                      src="https://gamersclub.com.br/assets/images/flags/24x24/BR.png" alt="Bandeira">
                                  </div>
                                  <div class="PlayerIdentityNickname__nickname"><strong
                                      class="PlayerIdentityNickname__nicknameText">Vitek1</strong></div>
                                </div>
                              </div>
                              <div class="PlayerIdentityBadges PlayerIdentityBadges--right">
                                <div class="WasdTooltip__wrapper PlayerIdentityBadges__featuredMedal"><img
                                    class="PlayerIdentityBadges--sx"
                                    src="https://gamersclub.com.br/images/medalhas/80.png" alt="Featured Medal"></div>
                                <div class="WasdTooltip__wrapper PlayerIdentityBadges__playerRole"><img
                                    class="PlayerIdentityBadges--sx" src="/assets/images/gaming_roles/icon-rifler.svg">
                                </div>
                                <div class="PlayerIdentityBadges__playerLevel">
                                  <div
                                    class="PlayerLevelBadge PlayerLevelBadge--19 PlayerLevelBadge--size-sx PlayerLevelBadge--nonSubscriber">
                                    <div class="PlayerLevelBadge__background"
                                      style="background-color: rgb(244, 110, 18);"><span
                                        class="PlayerLevelBadge__value">19</span></div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div
                              class="PlayerIdentityAvatar PlayerIdentityAvatar--sm PlayerIdentityAvatar--horizontal PlayerIdentityAvatar--horizontal-right PlayerIdentityAvatar--prime">
                              <span class="PlayerIdentityAvatar__frame"
                                style="background-image: url(&quot;undefined&quot;);"></span><svg
                                xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 80 80"
                                fill="none" class="PlayerIdentityAvatar__border">
                                <path
                                  d="M79 40C79 61.5391 61.5391 79 40 79C18.4609 79 1 61.5391 1 40C1 18.4609 18.4609 1 40 1C61.5391 1 79 18.4609 79 40Z"
                                  stroke="url(#paint0_linear)" stroke-width="2"></path>
                                <defs>
                                  <linearGradient id="paint0_linear" x1="40" y1="0" x2="40" y2="80"
                                    gradientUnits="userSpaceOnUse">
                                    <stop stop-color="#00CAFE"></stop>
                                    <stop offset="1" stop-color="#0085FF"></stop>
                                  </linearGradient>
                                </defs>
                              </svg>
                              <div class="WasdAvatar WasdAvatar--withLogo PlayerIdentityAvatar__avatarImage"
                                style="background: none;"><img class="WasdAvatar__image"
                                  src="https://static.gamersclub.com.br/players/avatar/44753/44753_medium.jpg"></div>
                              <img
                                src="data:image/png;base64,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"
                                class="PlayerIdentityAvatar__primeMedal" alt="Prime Medal">
                            </div>
                          </div>
                          <div class="PlayerListCard__readyDetail PlayerListCard__readyDetail--right"></div>
                        </div>
                      </li>
                      <li>
                        <div class="PlayerListCard PlayerListCard--right PlayerListCard--right--ready">
                          <div
                            class="PlayerListCard__readyDetail PlayerListCard__readyDetail--left PlayerListCard__readyDetail--left--hidden">
                          </div>
                          <div class="PlayerIdentity PlayerIdentity--horizontal">
                            <div class="PlayerIdentity__nicknameBadges PlayerIdentity__nicknameBadges--right">
                              <div class="PlayerIdentityNickname">
                                <div class="PlayerIdentityNickname__userInformations">
                                  <div class="PlayerIdentityNickname__flag PlayerIdentityNickname__flag--right"><img
                                      src="https://gamersclub.com.br/assets/images/flags/24x24/BR.png" alt="Bandeira">
                                  </div>
                                  <div class="PlayerIdentityNickname__nickname"><strong
                                      class="PlayerIdentityNickname__nicknameText">thwifo</strong></div>
                                </div>
                              </div>
                              <div class="PlayerIdentityBadges PlayerIdentityBadges--right">
                                <div class="WasdTooltip__wrapper PlayerIdentityBadges__featuredMedal"><img
                                    class="PlayerIdentityBadges--sx"
                                    src="https://gamersclub.com.br/images/medalhas/20.png" alt="Featured Medal"></div>
                                <div class="WasdTooltip__wrapper PlayerIdentityBadges__playerRole"><img
                                    class="PlayerIdentityBadges--sx" src="/assets/images/gaming_roles/icon-rifler.svg">
                                </div>
                                <div class="PlayerIdentityBadges__playerLevel">
                                  <div
                                    class="PlayerLevelBadge PlayerLevelBadge--20 PlayerLevelBadge--size-sx PlayerLevelBadge--nonSubscriber">
                                    <div class="PlayerLevelBadge__background"
                                      style="background-color: rgb(235, 47, 47);"><span
                                        class="PlayerLevelBadge__value">20</span></div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div
                              class="PlayerIdentityAvatar PlayerIdentityAvatar--sm PlayerIdentityAvatar--horizontal PlayerIdentityAvatar--horizontal-right PlayerIdentityAvatar--prime">
                              <span class="PlayerIdentityAvatar__frame"
                                style="background-image: url(&quot;undefined&quot;);"></span><svg
                                xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 80 80"
                                fill="none" class="PlayerIdentityAvatar__border">
                                <path
                                  d="M79 40C79 61.5391 61.5391 79 40 79C18.4609 79 1 61.5391 1 40C1 18.4609 18.4609 1 40 1C61.5391 1 79 18.4609 79 40Z"
                                  stroke="url(#paint0_linear)" stroke-width="2"></path>
                                <defs>
                                  <linearGradient id="paint0_linear" x1="40" y1="0" x2="40" y2="80"
                                    gradientUnits="userSpaceOnUse">
                                    <stop stop-color="#00CAFE"></stop>
                                    <stop offset="1" stop-color="#0085FF"></stop>
                                  </linearGradient>
                                </defs>
                              </svg>
                              <div class="WasdAvatar WasdAvatar--withLogo PlayerIdentityAvatar__avatarImage"
                                style="background: none;"><img class="WasdAvatar__image"
                                  src="https://static.gamersclub.com.br/players/avatar/205966/205966_medium.jpg"></div>
                              <img
                                src="data:image/png;base64,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"
                                class="PlayerIdentityAvatar__primeMedal" alt="Prime Medal">
                            </div>
                          </div>
                          <div class="PlayerListCard__readyDetail PlayerListCard__readyDetail--right"></div>
                        </div>
                      </li>
                      <li>
                        <div class="PlayerListCard PlayerListCard--right PlayerListCard--right--ready">
                          <div
                            class="PlayerListCard__readyDetail PlayerListCard__readyDetail--left PlayerListCard__readyDetail--left--hidden">
                          </div>
                          <div class="PlayerIdentity PlayerIdentity--horizontal">
                            <div class="PlayerIdentity__nicknameBadges PlayerIdentity__nicknameBadges--right">
                              <div class="PlayerIdentityNickname">
                                <div class="PlayerIdentityNickname__userInformations">
                                  <div class="PlayerIdentityNickname__flag PlayerIdentityNickname__flag--right"><img
                                      src="https://gamersclub.com.br/assets/images/flags/24x24/BR.png" alt="Bandeira">
                                  </div>
                                  <div class="PlayerIdentityNickname__nickname"><strong
                                      class="PlayerIdentityNickname__nicknameText">vini.jr</strong></div>
                                </div>
                              </div>
                              <div class="PlayerIdentityBadges PlayerIdentityBadges--right">
                                <div class="WasdTooltip__wrapper PlayerIdentityBadges__featuredMedal"><img
                                    class="PlayerIdentityBadges--sx"
                                    src="https://gamersclub.com.br/images/medalhas/20.png" alt="Featured Medal"></div>
                                <div class="WasdTooltip__wrapper PlayerIdentityBadges__playerRole"><img
                                    class="PlayerIdentityBadges--sx" src="/assets/images/gaming_roles/icon-lurker.svg">
                                </div>
                                <div class="PlayerIdentityBadges__playerLevel">
                                  <div
                                    class="PlayerLevelBadge PlayerLevelBadge--19 PlayerLevelBadge--size-sx PlayerLevelBadge--nonSubscriber">
                                    <div class="PlayerLevelBadge__background"
                                      style="background-color: rgb(244, 110, 18);"><span
                                        class="PlayerLevelBadge__value">19</span></div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div
                              class="PlayerIdentityAvatar PlayerIdentityAvatar--sm PlayerIdentityAvatar--horizontal PlayerIdentityAvatar--horizontal-right PlayerIdentityAvatar--prime">
                              <span class="PlayerIdentityAvatar__frame"
                                style="background-image: url(&quot;undefined&quot;);"></span><svg
                                xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 80 80"
                                fill="none" class="PlayerIdentityAvatar__border">
                                <path
                                  d="M79 40C79 61.5391 61.5391 79 40 79C18.4609 79 1 61.5391 1 40C1 18.4609 18.4609 1 40 1C61.5391 1 79 18.4609 79 40Z"
                                  stroke="url(#paint0_linear)" stroke-width="2"></path>
                                <defs>
                                  <linearGradient id="paint0_linear" x1="40" y1="0" x2="40" y2="80"
                                    gradientUnits="userSpaceOnUse">
                                    <stop stop-color="#00CAFE"></stop>
                                    <stop offset="1" stop-color="#0085FF"></stop>
                                  </linearGradient>
                                </defs>
                              </svg>
                              <div class="WasdAvatar WasdAvatar--withLogo PlayerIdentityAvatar__avatarImage"
                                style="background: none;"><img class="WasdAvatar__image"
                                  src="https://static.gamersclub.com.br/players/avatar/291225/291225_medium.jpg"></div>
                              <img
                                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAYfSURBVHgBjVV7bBRVF//dO3ceu9suXdoKBfoCCnwfxU/JZ5EqUYTEgkESE01MNNEYo8ao0ZAYjbHi6w9jjBHiP2qqJBo08RmjqLEW0Wo3BAW1YKjtFqSltN1X9zGzM3OvZ6aFaBT17t6d2XvvOb/z+J1zGf5hRL8sNrCi2sRMo7Oc8yPKkeClSs5zZL9l55P2/a2pv5Nn593pOX4lq1/YDc3YoCQ0KFqr0PRpurNPVqAfl++r1mV3/q5o8t8B9IzUaIsXvOgrfiMTDPrIEYiBTyHGjkNMjEIpDTKxEO7CVXAv3AKvrh0qq6DlsTsWd7rzD8xLnxdg2SnVmBqq7Pd9tOpnfkHs5Ucgjh2cO8ghyRXGgndGDtGHvHKb1qG89VG4xgro0/5QvY6rxp6KnvwTwH9Pqvk/D1UGfIbl1v63EO15HMy1Zw+QViUVvIal9MohxodmRYNNAlFcoHj5DtjLboOe8UdipybWZt9rzQai2lmA7NaHnvHAuiJf7EHVS49SjOkfKfbi9XAv2wY/VoOZm3bBXX8zjPIUnGoCK+XAKwVCkDBGD0Aadahc8L8EVLTZ+/6pt895oL871eHq1QMR/xQi922GssnymlpIz0XlunuBxnZ4roCfLQFeIBIDy1fAU/0wf3gDnCnw8jQgLMxc8wF8Zzm00cxGr6+hbzZEbxY+RlR01b50O1SyF+Wbd8Bbu5msb6I4W2AzZWiTZ6CKNpRH50sCylwM5VtAgTzNnEBkuhdm8knIBZcid8lesF9m+lRf3UZR8+54S94XXfzEICn/PMQzPtwDd/4KmHwU3HaAnw5Cm78YmmfDGZ+AYglgJktsWgNZMaDFqmEMvgrOOfhkkpJ9BG7V6g3RDakGkS1oHTAYIgMfhTFXUkLPTSKx6w4Uuu6h2NfCqo4jv/IGimUcbA2FPCNhJV8AE3HEy8fAvnoBAaUCVgVZN379BO6SCzWZSGzieszsJAbCODMUJiSwQtM0cJpBdSnfRGVGITrQQ+AM0mGwjr0Olp2kww2U5HQowzgRmWZgpLBHZukT0Tu5ZFoNBKVNZkPFwfRiCRS23g3X08CkD2f1NcDYUbDARPpGSz/Dbd5OSiuwEUehbQcxaNGsUUKDcFPkbUAhFeFh6dOUjhOGJ5je1ltR2nwf0NxOGz4lbhXKGx+G+PodxE70o9h2J9wL1sFLp1ARS1FedCeKiVvIW590hrwktpGDwUdliyUQlcuxZvh0QJJCDPQBqUn4v+bAUkPQTucJpxk8m4EcHoKdbQRLezDG+qGIUZhKwyoeoBxI0uHB43WkkBxw/BxRWO8PACpWY2i9JBBx/BuIwT74CzsBcwkwSpWfB6wqysr0OBg1PV2WwBIrIasvgsgloWV6z8n7kf+EjbFY8vq5mS70wvaoNq4KLQipQE8rSKpZB1+rh3nsA1QdeQ68eiX53QLz6C5UT/dAigR80YRY9hUSU6Hy4GnXbCHtNnD4aJKXHmwa02aKB7zFF8OnxhUSjQ6JicMwDr4Of8m1xIBWiqYFZ3iYNvMQnFymQnOi22BNvAY+9XVoWNAIvbor4ZmrIUxjH06vT/GwX0zndjLqcqXtz5JgLAQI6KKfOUTt4HuUa7dARS6FV15EFrfBN9uQdrZAdzPg6cOY64fU9AxUVj1NxADqGrXuYD0E8Ha39fF8Ya9X1YrSpifmWiR1T2rBKj8MUSigFFsLcepJ6KnnYevbaG0McmKQkrF6rsgUnJXdcLwm6CbbfXqPkfzjfXDLFzVsUfshZcZbq354FcaXOyHdMvzoUqJfFNw0oc0cCo+65sVQLoXEPQmNTYEZVbDJcrvmBpgGhpa1G+sGH2PpP1042L6/UW//f69bEcv1zAhi33WDjXx27uJQvz+rZhe9+HoUVzwDqVMHZd7Ignp2xVjPX1w458b6ffNxUcfjTMTuDjqnSB+FfvJ9aNM/QvOnKdZUTPHl5MVSOPOuhquvCYtLeOW9MTNz19mL5vwAZ8f1wx3Mqt1Joe2CZoWJO1v1ofXh5e/7LJc7YDqFnfa3bX1/peb8AHPDWvVNi93W0iGU1ik1fR6THKpcKAvB+oWqfF76pGX87+R/A7qA10Xbzq60AAAAAElFTkSuQmCC"
                                class="PlayerIdentityAvatar__primeMedal" alt="Prime Medal">
                            </div>
                          </div>
                          <div class="PlayerListCard__readyDetail PlayerListCard__readyDetail--right"></div>
                        </div>
                      </li>
                      <li>
                        <div class="PlayerListCard PlayerListCard--right PlayerListCard--right--ready">
                          <div
                            class="PlayerListCard__readyDetail PlayerListCard__readyDetail--left PlayerListCard__readyDetail--left--hidden">
                          </div>
                          <div class="PlayerIdentity PlayerIdentity--horizontal">
                            <div class="PlayerIdentity__nicknameBadges PlayerIdentity__nicknameBadges--right">
                              <div class="PlayerIdentityNickname">
                                <div class="PlayerIdentityNickname__userInformations">
                                  <div class="PlayerIdentityNickname__flag PlayerIdentityNickname__flag--right"><img
                                      src="https://gamersclub.com.br/assets/images/flags/24x24/BR.png" alt="Bandeira">
                                  </div>
                                  <div class="PlayerIdentityNickname__nickname"><strong
                                      class="PlayerIdentityNickname__nicknameText">try again bitch</strong></div>
                                </div>
                              </div>
                              <div class="PlayerIdentityBadges PlayerIdentityBadges--right">
                                <div class="WasdTooltip__wrapper PlayerIdentityBadges__featuredMedal"><img
                                    class="PlayerIdentityBadges--sx"
                                    src="https://gamersclub.com.br/images/medalhas/241.png" alt="Featured Medal"></div>
                                <div class="WasdTooltip__wrapper PlayerIdentityBadges__playerRole"><img
                                    class="PlayerIdentityBadges--sx" src="/assets/images/gaming_roles/icon-rifler.svg">
                                </div>
                                <div class="PlayerIdentityBadges__playerLevel">
                                  <div
                                    class="PlayerLevelBadge PlayerLevelBadge--19 PlayerLevelBadge--size-sx PlayerLevelBadge--subscriber">
                                    <div class="PlayerLevelBadge__background"
                                      style="background-image: url(&quot;/assets/images/level/19.svg&quot;);"><span
                                        class="PlayerLevelBadge__value">19</span></div>
                                  </div>
                                </div>
                                <div class="WasdTooltip__wrapper PlayerIdentityBadges__subscription"><img
                                    class="PlayerIdentityBadges--sx"
                                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAABEhSURBVHgB1VppkFzVdf7e2q97eqZnXzTIEkJCIAnJUAjZQSwCxG6TBEIwUAUuiDEmCySlmAquFLFjEjuBUDE7VJIqCIswqwibiJBAg8wmiJCQQCAhaRaNZunpfXlbvnNfz1iDGQxC/uGrunrdT6/vPct3vnPOfdLwOxrZbF8rYP4ddN01tMKtdXUzB/D7MPbseS2eye+9uFhKb88XRsJcfjjMFYb3pLMDl4VhGMNBHhoO4qDVl5pW/KdBGC4NfF+X5UP5E4bQNS3QNP2VYqHwo46OGT04SOOgKNCf7p/RYNk/oZSXBEGgU2KKHQ1+V5uMf9d1PeC3u0M//JfGxs6d+IrjKymwJ7OnuVG3r9F042oK2qVpmrK2TPCz5/oUPICh6+r52u1oY93o4+3b3IpxR0tLSxYHOHQcwLjxxhv1TH7fmU2ms4b2/bHn+11BGIDQUVOsvXXHAP785w/hmp89jK079ypTRXASr4TwPa/bc4N/Mmx/XTrb94dU+oCM+aV/NJjescgxEjfRhGcEgWvwijDwaFmTi2kYShdw1+MbsPKZl1DJjyEo5xFr7sLlF5yJS85ajK6WegR+tHMYRiIYpu7rGlZXK+4Nt99+77s0UPBF5fnCCgwO7uiwY+YK7nkFrdWoaYayaE0KFEsefvnye3jgqXXo7e2FEbMV8EO/Ar9ShlcsYeacufjuRefgj0+ah5hlTxJB18UWYZF+uMPVC//akZw1+EXk+q0K9PX1tVpx9yrLMP/K89w29SNaXWGZfxXLLp7r2Yb7nuxB/8Aw9HgjKC28ahFwi/DdCgLX5azCL+VFVMw66jh8/0/PwnnLjmDc62q9cXF0Xaae4a1bdfh31Nd37jsgBQTnV11z6UmGYd4Tht5sgYcwSmStaNN3tg3g1ofXYfOHu2A1HQIYSQSlDPzyGIUlfNwyP+fh+wxmegGEmgR44AfQ7TosWboMKy5fjoVzpkU0pYhXm9iDynyswf+LhobO50kQ4WfJaXzWzYGR7fOXLFl0Vxj4P/X9aqss6nNzWVuY5pOBNG76r3W484lXkNVb4HQt4o4OAlo98GSWOUtwwgJmdpQxPKbcRRl15bVIxAC7tr2LJ9dsQ+9ogMNmNKOpoW6Cb2ts1kyoXlQq55f88IcrNsfjyaG1a9eGU3qgt/f1FtNOXesHPqkRTYoOxSY1N2dyFTy5bhseeekNuLEG6K0LKXiM1i7AzQzDU5bPEEEjtH4Jl5zwCRbPyeDqW7qjWAlkvRrNMpJDz40UI/Bbpx2OK77D+Fi+AM0NCRVfeg2qsje9kbcs8xeBX7qloaF7+DMV2DOw6TZergm4uASVekCBXceat3fjP554FYMFD86MY4FYC4OzqgI0rJZRzQ7TA3kElRzcwjASwSie+PFmdLWWcMHfHopNexL8tyoD1UJIaNG7/GzySmUMMpkn/xbD4Ucdj6svPhnnnHB4be8oDUZK6OKg+1qa2v9sXGZzfwU810uOx5MoIQts2TGCe554E5t3jyI5cx7i07vhV2mfksDEJbaLkRKhWJQBS0FkzzMWj+Kw6TluGuLq80fx/ZsJD2GukHEgVlXJTYTnPc+voTnAto2rcd3mt/D4iafgLy87GUfN7lBysBKJng/1STJPSmTZwhBG0r3IF0dVwK7euBfX3fUr7ChaSC08FaibQeERMUqlRI4vKiUCUqUSXizru7CDEr53bh839biOh+VLxjCnswjdrMFRLK8spUeRYRoqNgRZupVQcfTKmqfx3RsexOq3B/aPCT43OUVMUiCT24dSOYPRdB/y+TR2j9ALZBd7+jHMnNyE0ocUPqhykh69KpWgwIFcq4VapvVx+tf3YmZnDp4XKnzHYh4uPTsDLYyEFxjJFSbhJF7h1EybDrKUYrrlkBMaKEsFu4d9slgQsVcQMdiUCni0olCeWN/1S4I8LmqrJBRUK3BLVWXhkML7VaHInKLJULnFV1P3i/jOibsQcwJYFrOsLjPA+ScPY0Z7VSAQKcF1JRkaZozTVvCCFikHUc5OwY81Ka+I8KKEUgTh1AoExKIrFg7kWuGCFiqeTcE9BRsITGhtr1xgQBZqTFKp0WdVBeKyI/uxYHauhlflfHWpT1Zx8Wkj3FGMIllXrC7CjkOJ04gjYj0Thl3PsHDokSj/TBi26k9SYFJAyHApRCwWVw/Lxr4fVZh+uawE9KsVdRWrV5lhdUKnDqOkviy6U2lcevx2JBI1N9fyhixk2xrO+cYQtu5KYGtvIwbSMWSLhI+yaqCUCgM3ghehFBgJOsIhKjx43EsXD0ky/ZQHPqUArQJPEZfP4PRJb2VaQasyMMk27dZudDf3o7thCJ31Wcxo3IcZnXm0NlRRV+/DiWmwHWLYiNg5Kq+DyKo09MxDfdx87Q6IM0tFHftGLewZimN7r4Pd+xLoH7aoWBw7BuOoiOL0SL5YRpnGS8TrVAzomv75HpCdyhVi3Ipc71MplaiI99nWq7jy2K2YPS8gxtWjkAwv11DReRiVG5ogRVOltXKAtDCQcpsB7VBJO0RdMkBjSxXz5lZwiicG0/DRlgCPbWjDzsEGhDScYSdZAWgYHR2Bm/To2ToayZ46Bly6SlOYc2FRe0OyrBWHKzUMC7MXP5iFnz/YhO2bQlSrQmmhgnAQaNEMhQh0ToGiMIbU/VEQCvkL0uWePKsoUw/Ub4QsPvnAZ1kRw13PdNHzzQzsOoQJJkvKVS6XkB4bwdDwIIvH8tQKqGoQFhe21MK6bcCK26womWmrHvREM14fOxb//lgT3nwVIKrG4xSmGSoi0o0I/xF7EJBeVCqE4a/vReUBf6NHwbv1LR/3PurgjrUL4bTOo+VZptisapP10GyTcegp6DQ1tvyGyJMgZOmOcr+h25xkAiaeVCqGMcaD7uYYcGWYdSms6Z2H0tPvsVrO4ISzCIt4GGVLPYwyv0CGdBnQwnJPPqtiUwsnlQeSgF9f4+KR/03g6ffnw26cxRxQR/JLqOLQaU7CsovKg4bkDLVKMLUCEuEGqVNXAUjs0w3lih/RJNkmCMhAZCHNMLG+fw52PbQTK/LDOPF0HW3ToDhfIBPUPDLuU4zHgTK9BCJhUQJ6XnBx93NN6OlfBCv1NQUbyQ86DRgSBZ4bEooRpY8RQqJ2Q6p5agVMw8Z4tWgaMdJliOJImlcvyrJCo4STJB0rUY/e0hz82zMhSqVhnHuhCfGwaUawiuoXoWGM31BXuV+t6Fj7VBn3r23Ga3sX0/KHqDU1XZKb0GhMUambIxOWfbWG5KZsLgtLcsdUMaCsBan6Ykg1MAt6NFuGyafIsoDB45NOSQ+KuwNPmhJSXmkWnnsriVIunPDiRGCEWnQiEUYNsHRbMnwG8sb3bawb/AaL2iMU5k1mXXUl85ixFKv0JLN6MFFyl1k8ZrMZjGVGp/aAlNBRFaqrtA26MCxKqcCyolKIKFIm8SBKaDS3QK0tGSKeHC+4aslVAlcwD1VwqoQY7aHBYcJtp7diyRYmq4TKyjqtrpPxIJ/ZrTm8uqxcfSbLsEbHdaTRZH1qagUMQ4KXm5FGJWmwmGTGyfNaVn2tFGrKtrWCSuJBVp7W6CJeXzu+qtUu+wfr/udB459bWwI4RKwrNVFNaBXAoi2/J+sSyLssIaRwlBZU7tU3wHHqpoaQUGi0OT8xjUvi5tmIKhtU7S+xIC5VfBioYHaMKtqbXZYfEV0K3en7Nem1NromeBQX8rm9I0CTnYVBxpGExQ+ETUJh30qk1HdlqDAKZPYqpPIKPj1+o5QQBvBZcebyo1Qoofpbje2hVKH7C67KYX6Po4jWtijzjvOOBPwYm743XqogNxbiuGUWDpljTIJYa7uOFNIYc1IqcjTJvFJGW5FHNNuCUczVPBgoaGcyYyxD3KkVUFUis6Rm6gpCFXKdxrI5lJJZWR4K9yrJ1XBZbxTR2RmoTcTC+UyAt9dW0bM2xJuDKQwXLJyyZQSL5ldwwrcctHVHmbqxhX2wOYpdwqyEjk2rS3Uqrab0GDGLwWyMwzLKAFW2pDz8mloBOl8FnmgrQRzQbSilmQNyAnxleTlZ0GRBKaW5aipWRFOHyYMtJqXny3hjrY/1vQ14a6QLWsNhitfv+XAIRw/uwMZ3hrD42BCLl8eRambuiA0ra1sJybwxtb5gLiRvSkFohvQ+97XoFd2XHlpTMn6OB0Q4jdnPZsGVwKzpBQaNjdxwllbi0X4g5vIiWpcGm892GBl8uNHF4/d5eKM3iU2ZNmT0bhipxogO2bBY8TZs8WZia98ubEzvxDsbB3HcN4E2g+Uz20l5Rqf1dWE1KS/CEop73kQpO4L2BdPUPZ99gE6IV73y1Ao4LDErbNAFPg45fvkxSXT95CLc+d+HYsP6l5lU0oot1HmoL65lhWh7ePAZC6/T4hl0wEy0kQDiKhlFDYEedV5OM7REB96vHomP932Cd57fiqMTe2B3cU3zEGV9iQ0vtxNjuzfha00OzjunA4e2R4fBwkKGQFz7nCAuV6quuE9OmjNZnkIkU1jAFW674WweHy7Afz7Wg+3vvcYVWU4IZ1OB1f0dyFaTMOpamYUTtZbQqAlfy77KwnEFF+m09KY52OYtxQflXYjzfDgmQVwewOiud9CSMPHXf/J1zO10USgUFWz2P+wyNCM/pQLZkdHrk6mGNGnwGraWiTFSieDPpHuXL5mGhYctx/+sn4uVT/dguH9bFLRaJ/sOIxIc4UTQSSchWVsbPwUZP4UQ3mepbvJgzGydA431fbFvA2wvj0tOnYNzl85EMs46iKSRz+fVLBTykgBHTVO/u1Twb5kEe3xqyDn9q7964WjTMP+Ryp9erZSNBhY5uewYcrms+skQmeaJdb1Yv/5tVDKfUIEmWtlRvazgGTWhxepSIqCWadUzUl44jYpLA1a4QXkflsyfgSv/aB66W+ITDWMofXAgCYzhGwSrPt6+8/oLL7zwg0/LO+XhrijS07P6LMsxfuE48Vn7BveqBcWNriuJK4aRooP7Ht+CTW+9SnorKHhoFFqUiHi9Dma8WSVCzYySlEF6FFar5Acwf+50XHX+0Zg/s3Hi3KdajZqqUFXGxkexmH3FypWPr5/qncFvPV7v6XmhnV3QD4LQ/RsGU1LaRMmKMixSX1trJ1a/0Y+HVm3Erg9ep3VTDOQWVVXqqkyg0LHGqFEng3jlUbS3deCyby/CqYunIx4zVOOu1aJTvVPTtSEG4s2GUbnvyCOXjHyefF/4Bcezz65sI56v58HGDxjjjjqnlA+sTRyHGZvwWb9pDA/Ke4LeHQxyJiIqoxkJRYPVwl50d3XjgjMW4ezjD0XCsSb65vFje7IM40+7l9XAzbNnz973ReT6Uq+YBFarVj1wNAPxZ7TVKdWqq4vlUqkWNDJOHB7HjBVdPPriNjy8agPPk9IK6xbL5PPOPB6XnzuXxy/ORHEmu0fCS/7HMzyGvGHevEWbv4xMB/RiTRR59sVfnhMG2j9Uy+VjhB5jzCGJRFL1ERIfH/elcfsj/0cWMyn4EThiZnPtmF5DgSW6NCbyG3pyM0/urr3//kdf/jLvxr6SAuPj2WcfaOABy/dozRUUrt1kJo3ZDmpvFZArFNBGvNfX1UUvu3Ud469iWa70kenuLJe9OxYuXJjGAY6D8qL7qadWzrYTsRW2YV9p2Zbuul7teNJDS0sra/t69ZxkUsuy5I39/cXC2N8vWHDsbnzFcVD/q8FLL636pu3E/5nt31KXB0TjFg9q/9WAwq8zY9qPTvqDM17DQRoH9KJ7qnHaad/a8O7G908vlvJXxR2nV/phCk2qtD9i5Fy+5b0PzzqYwss4qB7Yf7zyyvNd1SC8jodXJt8V37Rs2beH8TsY/w+yu6LEJOCYUQAAAABJRU5ErkJggg=="
                                    alt="Player Subscription"></div>
                              </div>
                            </div>
                            <div
                              class="PlayerIdentityAvatar PlayerIdentityAvatar--sm PlayerIdentityAvatar--horizontal PlayerIdentityAvatar--horizontal-right PlayerIdentityAvatar--prime">
                              <span class="PlayerIdentityAvatar__frame"
                                style="background-image: url(&quot;undefined&quot;);"></span><svg
                                xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 80 80"
                                fill="none" class="PlayerIdentityAvatar__border">
                                <path
                                  d="M79 40C79 61.5391 61.5391 79 40 79C18.4609 79 1 61.5391 1 40C1 18.4609 18.4609 1 40 1C61.5391 1 79 18.4609 79 40Z"
                                  stroke="url(#paint0_linear)" stroke-width="2"></path>
                                <defs>
                                  <linearGradient id="paint0_linear" x1="40" y1="0" x2="40" y2="80"
                                    gradientUnits="userSpaceOnUse">
                                    <stop stop-color="#00CAFE"></stop>
                                    <stop offset="1" stop-color="#0085FF"></stop>
                                  </linearGradient>
                                </defs>
                              </svg>
                              <div class="WasdAvatar WasdAvatar--withLogo PlayerIdentityAvatar__avatarImage"
                                style="background: none;"><img class="WasdAvatar__image"
                                  src="https://static.gamersclub.com.br/players/avatar/441123/441123_medium.jpg"></div>
                              <img
                                src="data:image/png;base64,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"
                                class="PlayerIdentityAvatar__primeMedal" alt="Prime Medal">
                            </div>
                          </div>
                          <div class="PlayerListCard__readyDetail PlayerListCard__readyDetail--right"></div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </aside>
              </main>
            </main>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
const GCPreMatchModalComponent = defineComponent({})
export default GCPreMatchModalComponent
</script>

<style>

</style>