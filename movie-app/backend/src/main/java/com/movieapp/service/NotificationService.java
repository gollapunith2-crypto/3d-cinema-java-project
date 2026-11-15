package com.movieapp.service;
import org.slf4j.*;
import org.springframework.stereotype.Service;
import java.util.List;
/** MOCK: replace the log line with a WhatsApp Business Cloud API call + generated PDF. */
@Service
public class NotificationService {
    private static final Logger log = LoggerFactory.getLogger(NotificationService.class);
    public void sendWhatsAppTicket(String phone, String code, List<String> seats) {
        log.info("[MOCK WhatsApp] PDF ticket {} for seats {} sent to {}", code, seats, phone);
    }
}
