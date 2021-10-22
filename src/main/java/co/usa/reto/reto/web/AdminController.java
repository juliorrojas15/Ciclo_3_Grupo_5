package co.usa.reto.reto.web;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;
import co.usa.reto.reto.model.Admin;
import co.usa.reto.reto.service.AdminService;

@RestController
@RequestMapping("/api/Admin")
@CrossOrigin(origins = "*", methods = { RequestMethod.GET, RequestMethod.POST, 
                                        RequestMethod.DELETE, RequestMethod.PUT })
public class AdminController {
    @Autowired
    private AdminService adminService;

    @GetMapping("/all")
    public List<Admin> getAdmins(){
        return adminService.getAll();
    }

    @GetMapping("/{numId}")
    public Optional<Admin> getByID(@PathVariable("numId") int Id){
        return adminService.getAdmin(Id);
    }

    @PostMapping("/save")
    @ResponseStatus(HttpStatus.CREATED)
    public Admin save(@RequestBody Admin admin){
        return adminService.save(admin);
    } 
}
