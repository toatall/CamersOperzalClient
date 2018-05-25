using CamersOperzalClient.Models;
using System;
using System.Collections.Generic;
using System.Dynamic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;



namespace CamersOperzalClient.Controllers
{
    public class HomeController : Controller
    {

        private ContextDatabase db = new ContextDatabase();

        /// <summary>
        /// Главная страница
        /// </summary>
        /// <returns></returns>
        public ActionResult Index()
        {
            try
            {
                IEnumerable<Ifns> TableIfns = db.TableIfns;
                if (TableIfns.Count() > 0)
                    return View(TableIfns.OrderBy(x => x.Order));
            }
            catch (Exception e)
            {
                Diagnostic.WriteLogError("CamersOperzal", "Произошла ошибка при получении списка Инспекций (загрузка главной страницы). \n"                   
                    + e.Message + "\n" + e.Source + "\n" + e.StackTrace);
            }
            return View("Error");
        }

        
        /// <summary>
        /// Просмотр изображения с камеры
        /// </summary>
        /// <param name="Id">Идентификатор камеры</param>
        /// <returns></returns>
        public ActionResult Camera(int? Id)
        {
            if (Id == null)
            {
                throw new HttpException(400, "Некорректный запрос");
            }

            // получения сведений о камере
            General Camera = db.TableGeneral.Find(Id);
            if (Camera == null)
                return HttpNotFound();

            // получение настройки (интервала загрузки изображения)
            Configuration Config = db.TableConfiguration.Find("IntervalTimeout");
            if (Config == null)
                return HttpNotFound();
            ViewBag.IntervalTimeout = Config.ConfigValue;

            // запись информации о посещении пользователем страницы (для сбора статистики)
            try
            {
                db.VisitUserLog(Session.SessionID, Request.UserHostAddress, Camera.Id, Camera.IfnsCode, Request.UserAgent);
            }
            catch (Exception e)
            {
                Diagnostic.WriteLogError("CamersOperzal", "Произошла ошибка записи статистической информации о пользователе в БД. \n" +
                    "SessionId: " + Session.SessionID + ", UserHostAddress: " + Request.UserHostAddress + ", CameraId: " + Camera.Id
                    + ", Ifns: " + Camera.IfnsCode + ", UserAgent: " + Request.UserAgent + "\n"
                    + e.Message + "\n" + e.Source + "\n" + e.StackTrace);
            }
            
            return View(Camera);
        }



        /// <summary>
        /// Получение изображения с камеры
        /// В случае невозможности загрузки изображения,
        /// возвращается изображение "images/no-image.jpg"
        /// </summary>
        /// <param name="Id">Идентификатор камеры</param>
        /// <returns>null|"image/jpeg"</returns>
        public ActionResult CameraUrl(int Id)
        {
            try
            {                
                // получения сведений о камере
                General Camera = db.TableGeneral.Find(Id);
                if (Camera == null)
                    return null;

                WebClient webClient = new WebClient();
                if (Camera.CameraAuthUser != null)
                {
                    webClient.UseDefaultCredentials = true;
                    webClient.Credentials = new NetworkCredential(Camera.CameraAuthUser, Camera.CameraAuthPassword);
                }
                byte[] buffer = webClient.DownloadData(Camera.CameraImgLink);
                return new FileStreamResult(new System.IO.MemoryStream(buffer), "image/jpeg");
            }
            catch (Exception e)
            {
                byte[] buffer = System.IO.File.ReadAllBytes(AppDomain.CurrentDomain.BaseDirectory +  "/images/no-image.jpg");
                return new FileStreamResult(new System.IO.MemoryStream(buffer), "image/jpeg");
                /*Diagnostic.WriteLogError("CamersOperzal", "Произошла ошибка записи статистической информации о пользователе в БД. \n" +
                    "SessionId: " + Session.SessionID + ", UserHostAddress: " + Request.UserHostAddress + ", CameraId: " + Camera.Id
                    + ", Ifns: " + Camera.IfnsCode + ", UserAgent: " + Request.UserAgent + "\n"
                    + e.Message + "\n" + e.Source + "\n" + e.StackTrace);*/
            }
                        
        }
 
    }
}