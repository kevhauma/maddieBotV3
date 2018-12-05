let bot = require("./bot")


bots= [
    "MzE2NjMwMjYzNTQxMTM3NDA4.Dcji8g.e71GilhhcJIS5uqPazN2FqcsaOw",
    "MzgyMjg5NzUxNDE3NDIxODQ1.DumIbA.M2NQu9ya7Iv_7qjq_7iin2rE_ys",
    "Mzg1NDcyNjY4OTk4MDQxNjEw.DumIgg._bCjdhEd8d9uaZrL-KJY986mO_I",
    "NDE2MjEyMjUxNzU0NjI3MDcz.DumIkg.ruBK1akKnIGgtFqSehenk8ej7KU",
    "NTExNTM2Mzk0NTg2NTU0Mzc4.DumIog.l1tlCVmpAXjoV8khROUGchECmDI"   
]


bots.forEach(t=>{
    bot.start(t)
})