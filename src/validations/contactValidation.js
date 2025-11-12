import * as YUP from "yup";

export const contactSchema = YUP.object().shape({
  fullname: YUP.string("نام وارد شده معتبر نمی باشد").required(
    "نام و نام خانوادگی الزامی میباشد"
  ),
  photo: YUP.string()
    .url("آدرس معتبر نیست")
    .required("تصویر مخاطب الزامی می باشد"),
  mobile: YUP.number("شماره موبایل معتبر نمی باشد").required(
    "وارد کردن شما موبایل الزامی میباشد"
  ),
  email: YUP.string()
    .email("پست الکترونیک وارد شده معتبر نمی باشد")
    .required("وارد کردن پست الکترونیک الزامی می باشد"),
  job: YUP.string().nullable(),
  group: YUP.string().required("انتخاب گروه الزامی می باشد"),
});
