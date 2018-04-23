using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Web;

namespace CamersOperzalClient.Models
{
    /// <summary>
    /// Запись информации в журнал событий (раздел "Приложение"/"Application")
    /// </summary>
    public static class Diagnostic
    {

        /// <summary>
        /// Запись в журнал событий (тип события указывается в параметре)
        /// </summary>
        /// <param name="Source">Источник события</param>
        /// <param name="Message">Текст события</param>
        /// <param name="EventType">Тип события</param>
        /// <returns>true|false</returns>
        public static bool WriteLog(string Source, string Message, EventLogEntryType EventType)
        {
            try
            {                
                if (!EventLog.SourceExists(Source))
                {
                    EventLog.CreateEventSource(Source, "Application");

                }
                EventLog ev = new EventLog("Application");
                ev.Source = Source;
                ev.WriteEntry(Message, EventType);
            }
            catch (Exception)
            {
                return false;
            }
            return true;
        }

        /// <summary>
        /// Запись в журнал событий (информация)
        /// </summary>
        /// <param name="Source">Источник события</param>
        /// <param name="Message">Текст события</param>
        /// <returns>true|false</returns>
        /// <seealso cref="WriteLog"/>
        public static bool WriteLogInformation(string Source, string Message)
        {
            return WriteLog(Source, Message, EventLogEntryType.Information);
        }

        /// <summary>
        /// Запись в журнал событий (ошибка)
        /// </summary>
        /// <param name="Source">Источник события</param>
        /// <param name="Message">Текст события</param>
        /// <returns>true|false</returns>
        /// <seealso cref="WriteLog"/>
        public static bool WriteLogError(string Source, string Message)
        {
            return WriteLog(Source, Message, EventLogEntryType.Error);
        }

        /// <summary>
        /// Запись в журнал событий (предупреждение)
        /// </summary>
        /// <param name="Source">Источник события</param>
        /// <param name="Message">Текст события</param>
        /// <returns>true|false</returns>
        /// <seealso cref="WriteLog"/>
        public static bool WriteLogWarning(string Source, string Message)
        {
            return WriteLog(Source, Message, EventLogEntryType.Warning);
        }

    }
}