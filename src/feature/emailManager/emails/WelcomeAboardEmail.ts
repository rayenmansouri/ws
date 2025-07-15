import { frontUrl } from "../../../config";
import { TEndUserEnum } from "../../../constants/globalEnums";
import { IEmail } from "./email.interface";

type Payload = {
  userType: TEndUserEnum;
  email: string;
  fullName: string;
  password: string;
  schoolSubdomain: string;
  schoolPhone: string;
  schoolAddress: string;
  schoolEmail: string;
};

export class WelcomeAboardEmail implements IEmail {
  public subject: string;
  public message: string;
  public html: string;

  constructor(payload: Payload) {
    this.subject = "Bienvenue à bord";
    this.message = "Voici vos informations de connexion";
    this.html = generateHtml(payload);
  }
}

const generateHtml = (payload: Payload): string => {
  const {
    userType,
    email,
    fullName,
    password,
    schoolSubdomain,
    schoolPhone,
    schoolAddress,
    schoolEmail,
  } = payload;

  const webUrl = `${frontUrl?.replace("SUBDOMAIN", schoolSubdomain)}/${userType}`;

  return `
  <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
<meta charset="UTF-8">
<meta content="width=device-width, initial-scale=1" name="viewport">
<meta name="x-apple-disable-message-reformatting">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta content="telephone=no" name="format-detection">
<title>Welcome aboard</title><!--[if (mso 16)]>
<style type="text/css">
a {text-decoration: none;}
</style>
<![endif]--><!--[if gte mso 9]><style>sup { font-size: 100% !important; }</style><![endif]--><!--[if gte mso 9]>
<xml>
<o:OfficeDocumentSettings>
<o:AllowPNG></o:AllowPNG>
<o:PixelsPerInch>96</o:PixelsPerInch>
</o:OfficeDocumentSettings>
</xml>
<![endif]-->
<style type="text/css">
.rollover:hover .rollover-first {
max-height:0px!important;
display:none!important;
}
.rollover:hover .rollover-second {
max-height:none!important;
display:inline-block!important;
}
.rollover div {
font-size:0px;
}
u ~ div img + div > div {
display:none;
}
#outlook a {
padding:0;
}
span.MsoHyperlink,
span.MsoHyperlinkFollowed {
color:inherit;
mso-style-priority:99;
}
a.es-button {
mso-style-priority:100!important;
text-decoration:none!important;
}
a[x-apple-data-detectors] {
color:inherit!important;
text-decoration:none!important;
font-size:inherit!important;
font-family:inherit!important;
font-weight:inherit!important;
line-height:inherit!important;
}
.es-desk-hidden {
display:none;
float:left;
overflow:hidden;
width:0;
max-height:0;
line-height:0;
mso-hide:all;
}
.es-header-body a:hover {
color:#2cb543!important;
}
.es-content-body a:hover {
color:#2cb543!important;
}
.es-footer-body a:hover {
color:#ffffff!important;
}
.es-infoblock a:hover {
color:#cccccc!important;
}
.es-button-border:hover > a.es-button {
color:#ffffff!important;
}
@media only screen and (max-width:600px) {*[class="gmail-fix"] { display:none!important } p, a { line-height:150%!important } h1, h1 a { line-height:120%!important } h2, h2 a { line-height:120%!important } h3, h3 a { line-height:120%!important } h4, h4 a { line-height:120%!important } h5, h5 a { line-height:120%!important } h6, h6 a { line-height:120%!important } h1 { font-size:30px!important; text-align:left } h2 { font-size:24px!important; text-align:left } h3 { font-size:20px!important; text-align:left } h4 { font-size:24px!important; text-align:left } h5 { font-size:20px!important; text-align:left } h6 { font-size:16px!important; text-align:left } .es-header-body h1 a, .es-content-body h1 a, .es-footer-body h1 a { font-size:30px!important } .es-header-body h2 a, .es-content-body h2 a, .es-footer-body h2 a { font-size:24px!important } .es-header-body h3 a, .es-content-body h3 a, .es-footer-body h3 a { font-size:20px!important } .es-header-body h4 a, .es-content-body h4 a, .es-footer-body h4 a { font-size:24px!important } .es-header-body h5 a, .es-content-body h5 a, .es-footer-body h5 a { font-size:20px!important } .es-header-body h6 a, .es-content-body h6 a, .es-footer-body h6 a { font-size:16px!important } .es-menu td a { font-size:14px!important } .es-header-body p, .es-header-body a { font-size:14px!important } .es-content-body p, .es-content-body a { font-size:14px!important } .es-footer-body p, .es-footer-body a { font-size:14px!important } .es-infoblock p, .es-infoblock a { font-size:12px!important } .es-m-txt-c, .es-m-txt-c h1, .es-m-txt-c h2, .es-m-txt-c h3, .es-m-txt-c h4, .es-m-txt-c h5, .es-m-txt-c h6 { text-align:center!important } .es-m-txt-r, .es-m-txt-r h1, .es-m-txt-r h2, .es-m-txt-r h3, .es-m-txt-r h4, .es-m-txt-r h5, .es-m-txt-r h6 { text-align:right!important } .es-m-txt-j, .es-m-txt-j h1, .es-m-txt-j h2, .es-m-txt-j h3, .es-m-txt-j h4, .es-m-txt-j h5, .es-m-txt-j h6 { text-align:justify!important } .es-m-txt-l, .es-m-txt-l h1, .es-m-txt-l h2, .es-m-txt-l h3, .es-m-txt-l h4, .es-m-txt-l h5, .es-m-txt-l h6 { text-align:left!important } .es-m-txt-r img, .es-m-txt-c img, .es-m-txt-l img { display:inline!important } .es-m-txt-r .rollover:hover .rollover-second, .es-m-txt-c .rollover:hover .rollover-second, .es-m-txt-l .rollover:hover .rollover-second { display:inline!important } .es-m-txt-r .rollover div, .es-m-txt-c .rollover div, .es-m-txt-l .rollover div { line-height:0!important; font-size:0!important } .es-spacer { display:inline-table } a.es-button, button.es-button { font-size:18px!important } a.es-button, button.es-button { display:inline-block!important } .es-button-border { display:inline-block!important } .es-m-fw, .es-m-fw.es-fw, .es-m-fw .es-button { display:block!important } .es-m-il, .es-m-il .es-button, .es-social, .es-social td, .es-menu { display:inline-block!important } .es-adaptive table, .es-left, .es-right { width:100%!important } .es-content table, .es-header table, .es-footer table, .es-content, .es-footer, .es-header { width:100%!important; max-width:600px!important } .adapt-img { width:100%!important; height:auto!important } .es-mobile-hidden, .es-hidden { display:none!important } .es-desk-hidden { width:auto!important; overflow:visible!important; float:none!important; max-height:inherit!important; line-height:inherit!important } tr.es-desk-hidden { display:table-row!important } table.es-desk-hidden { display:table!important } td.es-desk-menu-hidden { display:table-cell!important } .es-menu td { width:1%!important } table.es-table-not-adapt, .esd-block-html table { width:auto!important } .es-social td { padding-bottom:10px } .h-auto { height:auto!important } .es-text-6313, .es-text-6313 p, .es-text-6313 a, .es-text-6313 h1, .es-text-6313 h2, .es-text-6313 h3, .es-text-6313 h4, .es-text-6313 h5, .es-text-6313 h6, .es-text-6313 ul, .es-text-6313 ol { font-size:25px!important } .es-text-2227, .es-text-2227 p, .es-text-2227 a, .es-text-2227 h1, .es-text-2227 h2, .es-text-2227 h3, .es-text-2227 h4, .es-text-2227 h5, .es-text-2227 h6, .es-text-2227 ul, .es-text-2227 ol { font-size:26px!important } .img-9833 { width:68px!important } .img-6692 { width:15px!important } .img-6087 { width:20px!important } .img-8465 { width:20px!important } .img-4673 { width:20px!important } }
</style>
</head>
<body style="width:100%;height:100%;padding:0;Margin:0">
<div class="es-wrapper-color" style="background-color:#F6F6F6"><!--[if gte mso 9]>
<v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
<v:fill type="tile" color="#f6f6f6"></v:fill>
</v:background>
<![endif]-->
<table class="es-wrapper" width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;padding:0;Margin:0;width:100%;height:100%;background-repeat:repeat;background-position:center top;background-color:#F6F6F6">
<tr>
<td valign="top" style="padding:0;Margin:0">
<table class="es-header" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;width:100%;table-layout:fixed !important;background-color:transparent;background-repeat:repeat;background-position:center top">
<tr>
<td align="center" bgcolor="#ffffff" style="padding:0;Margin:0;background-color:#ffffff">
<table class="es-header-body" cellspacing="0" cellpadding="0" bgcolor="transparent" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:transparent;width:600px">
<tr>
<td class="es-m-p20l es-m-p20r" align="left" bgcolor="#E4F8FF" style="padding:0;Margin:0;padding-top:35px;padding-right:45px;padding-left:45px;background-color:#E4F8FF">
<table class="es-right" cellspacing="0" cellpadding="0" align="right" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:right">
<tr>
<td class="es-m-p0r" valign="top" align="center" style="padding:0;Margin:0;width:510px">
<table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
<tr>
<td align="center" style="padding:0;Margin:0;font-size:0"><img class="adapt-img" src="https://xjuauk.stripocdn.email/content/guids/CABINET_b4ba189ab12e588a3ead12f778c374d86446e87c23cb477144ee31f7cb901c21/images/logo.png" alt="" width="362" style="display:block;font-size:14px;border:0;outline:none;text-decoration:none"></td>
</tr>
<tr>
<td align="center" style="padding:0;Margin:0;padding-top:1px;padding-bottom:45px"><p style="Margin:0;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;letter-spacing:0;color:#2F2F2F;font-size:14px"></p></td>
</tr>
<tr>
<td align="center" class="es-m-txt-c" style="padding:0;Margin:0"><h1 style="Margin:0;font-family:arial, 'helvetica neue', helvetica, sans-serif;mso-line-height-rule:exactly;letter-spacing:0;font-size:36px !important;font-style:normal;font-weight:normal;line-height:36px !important;color:#000">Bienvenue à bord</h1><p style="Margin:0;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:27px !important;letter-spacing:0;color:#333333;font-size:22px">${fullName}</p></td>
</tr>
</table></td>
</tr>
</table></td>
</tr>
<tr>
<td align="left" bgcolor="#E4F8FF" style="padding:0;Margin:0;padding-top:30px;padding-right:20px;padding-left:20px;background-color:#E4F8FF">
<table cellpadding="0" cellspacing="0" align="right" class="es-right" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:right">
<tr>
<td align="left" style="padding:0;Margin:0;width:560px">
<table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:separate;border-spacing:0px;border-radius:32px;background-color:#ffffff" bgcolor="#ffffff">
<tr>
<td align="center" style="padding:0;Margin:0;padding-top:32px;padding-bottom:30px;padding-left:15px;font-size:0"><img class="img-9833" src="https://xjuauk.stripocdn.email/content/guids/CABINET_5dc4d80cc27e7b2e5c64541c97eb7135c384bb4b9edb88dffb17dcfa38f9a74b/images/image.png" alt="" width="123" style="display:block;font-size:14px;border:0;outline:none;text-decoration:none"></td>
</tr>
<tr>
<td align="center" class="es-m-txt-l es-m-p5r es-m-p15l" style="padding:0;Margin:0;padding-left:10px"><p style="Margin:0;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:24px !important;letter-spacing:0;color:#373737;font-size:16px !important">Votre compte ${userType} a été créé avec succès. Voici vos identifiants de connexion:</p></td>
</tr>
<tr>
<td align="center" class="es-text-6313 es-m-txt-l es-m-p15l" style="padding:0;Margin:0;padding-top:30px;padding-bottom:30px;padding-left:10px;font-size:12px !important"><p style="Margin:0;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:24px !important;letter-spacing:0;color:#333333;font-size:16px !important">Email:&nbsp;<strong>${email}</strong></p><p style="Margin:0;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:24px !important;letter-spacing:0;color:#333333;font-size:16px !important"><strong>​</strong>Mot de passe:&nbsp;<strong>${password}</strong></p></td>
</tr>
<tr>
<td align="center" class="es-m-p15l" height="72" style="padding:0;Margin:0;padding-left:10px"><p style="Margin:0;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:16px !important;letter-spacing:0;color:#333333;font-size:16px !important">Cliquez sur le bouton ci-dessous pour accéder à votre compte.<br>Bon apprentissage!</p></td>
</tr>
<tr>
<td align="center" style="padding:0;Margin:0;padding-top:30px;padding-left:15px"><!--[if mso]><a href="${webUrl}" target="_blank" hidden>
<v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" esdevVmlButton href="${webUrl}"
style="height:41px; v-text-anchor:middle; width:174px" arcsize="17%" stroke="f" fillcolor="#0072c6">
<w:anchorlock></w:anchorlock>
<center style='color:#ffffff; font-family:arial, "helvetica neue", helvetica, sans-serif; font-size:15px; font-weight:400; line-height:15px; mso-text-raise:1px'>Login Now</center>
</v:roundrect></a>
<![endif]--><!--[if !mso]--><!-- --><span class="es-button-border msohide" style="border-style:solid;border-color:#2CB543;background:#0072C6;border-width:0;display:inline-block;border-radius:7px;width:auto;mso-hide:all"><a href="${webUrl}" class="es-button" target="_blank" style="mso-style-priority:100 !important;text-decoration:none !important;mso-line-height-rule:exactly;color:#FFFFFF;font-size:18px;padding:10px 44px;display:inline-block;background:#0072C6;border-radius:7px;font-family:arial, 'helvetica neue', helvetica, sans-serif;font-weight:normal;font-style:normal;line-height:22px !important;width:auto;text-align:center;letter-spacing:0;mso-padding-alt:0;mso-border-alt:10px solid #0072C6">Connectez-vous maintenant</a></span><!--<![endif]--></td>
</tr>
<tr>
<td align="center" style="padding:0;Margin:0;padding-top:30px;padding-left:15px;padding-bottom:32px"><p style="Margin:0;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;letter-spacing:0;color:#666;font-size:14px !important">Cordialement,<br>Équipe Web School</p></td>
</tr>
</table></td>
</tr>
</table></td>
</tr>
<tr>
<td class="es-m-p26t" align="left" bgcolor="#e4f8ff" style="padding:0;Margin:0;padding-right:20px;padding-left:20px;padding-top:20px;background-color:#e4f8ff">
<table cellpadding="0" cellspacing="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
<tr>
<td align="left" style="padding:0;Margin:0;width:560px">
<table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
<tr>
<td align="left" style="padding:0;Margin:0"><p style="Margin:0;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;letter-spacing:0;color:#333333;font-size:14px">​</p></td>
</tr>
</table></td>
</tr>
</table></td>
</tr>
<tr class="es-mobile-hidden">
<td class="es-m-p20l es-m-p20r es-m-p0t" align="left" bgcolor="#E4F8FF" style="Margin:0;padding-top:40px;padding-right:100px;padding-bottom:15px;padding-left:100px;background-color:#E4F8FF">
<table cellpadding="0" cellspacing="0" class="esdev-mso-table" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;width:400px">
<tr>
<td class="esdev-mso-td" valign="top" style="padding:0;Margin:0">
<table cellpadding="0" cellspacing="0" class="es-left" align="left" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left">
<tr>
<td align="left" style="padding:0;Margin:0;width:30px">
<table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
<tr>
<td align="center" style="padding:0;Margin:0;font-size:0"><img class="img-6692" src="https://xjuauk.stripocdn.email/content/guids/CABINET_b4ba189ab12e588a3ead12f778c374d86446e87c23cb477144ee31f7cb901c21/images/image_m3g.png" alt="" width="23" style="display:block;font-size:14px;border:0;outline:none;text-decoration:none"></td>
</tr>
</table></td>
</tr>
</table></td>
<td class="esdev-mso-td" valign="top" style="padding:0;Margin:0">
<table cellpadding="0" cellspacing="0" class="es-left" align="left" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left">
<tr>
<td align="left" style="padding:0;Margin:0;width:170px">
<table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
<tr>
<td align="left" style="padding:0;Margin:0"><p style="Margin:0;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;letter-spacing:0;color:#333333;font-size:14px">${schoolPhone}</p></td>
</tr>
</table></td>
</tr>
</table></td>
<td class="esdev-mso-td" valign="top" style="padding:0;Margin:0">
<table cellpadding="0" cellspacing="0" class="es-left" align="left" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left">
<tr>
<td align="left" style="padding:0;Margin:0;width:30px">
<table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
<tr>
<td align="center" style="padding:0;Margin:0;font-size:0"><img class="img-4673" src="https://xjuauk.stripocdn.email/content/guids/CABINET_b4ba189ab12e588a3ead12f778c374d86446e87c23cb477144ee31f7cb901c21/images/image_wP9.png" alt="" width="23" style="display:block;font-size:14px;border:0;outline:none;text-decoration:none"></td>
</tr>
</table></td>
</tr>
</table></td>
<td class="esdev-mso-td" valign="top" style="padding:0;Margin:0">
<table cellpadding="0" cellspacing="0" class="es-right" align="right" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:right">
<tr>
<td align="left" style="padding:0;Margin:0;width:170px">
<table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
<tr>
<td align="left" style="padding:0;Margin:0"><p style="Margin:0;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;letter-spacing:0;color:#333333;font-size:14px">${webUrl}</p></td>
</tr>
</table></td>
</tr>
</table></td>
</tr>
</table></td>
</tr>
<tr class="es-mobile-hidden">
<td class="es-m-p20l es-m-p20r" align="left" bgcolor="#E4F8FF" style="Margin:0;padding-right:100px;padding-left:100px;padding-top:10px;padding-bottom:50px;background-color:#E4F8FF">
<table cellpadding="0" cellspacing="0" class="esdev-mso-table" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;width:400px">
<tr>
<td class="esdev-mso-td" valign="top" style="padding:0;Margin:0">
<table cellpadding="0" cellspacing="0" class="es-left" align="left" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left">
<tr>
<td align="left" style="padding:0;Margin:0;width:30px">
<table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
<tr>
<td align="center" style="padding:0;Margin:0;font-size:0"><img class="img-8465" src="https://xjuauk.stripocdn.email/content/guids/CABINET_b4ba189ab12e588a3ead12f778c374d86446e87c23cb477144ee31f7cb901c21/images/image_kIR.png" alt="" width="23" style="display:block;font-size:14px;border:0;outline:none;text-decoration:none"></td>
</tr>
</table></td>
</tr>
</table></td>
<td class="esdev-mso-td" valign="top" style="padding:0;Margin:0">
<table cellpadding="0" cellspacing="0" class="es-left" align="left" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left">
<tr>
<td align="left" style="padding:0;Margin:0;width:170px">
<table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
<tr>
<td align="left" style="padding:0;Margin:0"><p style="Margin:0;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;letter-spacing:0;color:#333333;font-size:14px">${schoolEmail}</p></td>
</tr>
</table></td>
</tr>
</table></td>
<td class="esdev-mso-td" valign="top" style="padding:0;Margin:0">
<table cellpadding="0" cellspacing="0" class="es-left" align="left" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left">
<tr>
<td align="left" style="padding:0;Margin:0;width:30px">
<table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
<tr>
<td align="center" style="padding:0;Margin:0;font-size:0"><img class="img-6087" src="https://xjuauk.stripocdn.email/content/guids/CABINET_b4ba189ab12e588a3ead12f778c374d86446e87c23cb477144ee31f7cb901c21/images/image.png" alt="" width="23" style="display:block;font-size:14px;border:0;outline:none;text-decoration:none"></td>
</tr>
</table></td>
</tr>
</table></td>
<td class="esdev-mso-td" valign="top" style="padding:0;Margin:0">
<table cellpadding="0" cellspacing="0" class="es-right" align="right" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:right">
<tr>
<td align="left" style="padding:0;Margin:0;width:170px">
<table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
<tr>
<td align="left" style="padding:0;Margin:0"><p style="Margin:0;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;letter-spacing:0;color:#333333;font-size:14px">${schoolAddress}</p></td>
</tr>
</table></td>
</tr>
</table></td>
</tr>
</table></td>
</tr>
</table></td>
</tr>
</table></td>
</tr>
</table>
</div>
</body>
</html>
  `;
};
