
/* Тестовые модели, импортированные из net-small.json */

export class TestEnvironmentProvider
{
  #portModel93 = {};
  #portModel100 = {};
  #hostModel89 = {};
  #serviceModel4 = {};
  #serviceModel22 = {};
  #weaknessModel26 = {};
  #weaknessModel15 = {};
  #weaknessModel8 = {};

  #hosts = [this.#hostModel89];
  #ports = [this.#portModel93, this.#portModel100];
  #services = [this.#serviceModel4, this.#serviceModel22];
  #weaknesses = [this.#weaknessModel26, this.#weaknessModel15, this.#weaknessModel8];

  constructor ()
  {
    Object.assign(this.#portModel93,
        {
          "_key": 93,
          "last_updated": "2024-03-04T15:09:57.582266",
          "ip4_addr": this.#hostModel89,
          "port_num": 80,
          "service": this.#serviceModel22,
          "weaknesses": [
            this.#weaknessModel26
          ],
          "descriptive_label": "192.168.0.1:80"
        }
    );

    Object.assign(this.#portModel100,
        {
          "_key": 100,
          "last_updated": "2024-03-04T15:09:57.582288",
          "ip4_addr": this.#hostModel89,
          "port_num": 22,
          "service": this.#serviceModel4,
          "weaknesses": [
            this.#weaknessModel15
          ],
          "descriptive_label": "192.168.0.1:22"
        }
    );

    Object.assign(this.#hostModel89,
    {
      "_key": 89,
      "last_updated": "2024-03-04T15:09:57.582255",
      "address": "192.168.0.1",
      "ports": [ this.#portModel93, this.#portModel100 ],
      "descriptive_label": "192.168.0.1"
    }
    );

    Object.assign(this.#serviceModel4,
      {
        "_key": 4,
        "name": "ssh",
        "standard_port": null,
        "applicable_weaknesses": [
          this.#weaknessModel8,
          this.#weaknessModel15
        ]
      }
    );

    Object.assign(this.#serviceModel22,
      {
        "_key": 22,
        "name": "https",
        "standard_port": null,
        "applicable_weaknesses": [
          this.#weaknessModel26
        ]
      }
    );

    Object.assign(this.#weaknessModel26,
          {
            "_key": 26,
            "name": "acac",
            "weakness_type": "Misconfiguration",
            "details": "Access-Control-Allow-Credentials set to true",
            "cve_id": null,
            "vendor_id": null,
            "more_info": null
          }
    );

    Object.assign(this.#weaknessModel15,
          {
            "_key": 15,
            "name": "root",
            "weakness_type": "Misconfiguration",
            "details": "login as root possible",
            "cve_id": null,
            "vendor_id": null,
            "more_info": null
          }
    );

    Object.assign(this.#weaknessModel8,
          {
            "_key": 8,
            "name": "notimeout",
            "weakness_type": "Misconfiguration",
            "details": "immediate password re-request",
            "cve_id": null,
            "vendor_id": null,
            "more_info": null
          },
    );
  }

  hosts()
  {
    return this.#hosts;
  }
  ports()
  {
    return this.#ports;
  }
  services()
  {
    return this.#services;
  }
  weaknesses()
  {
    return this.#weaknesses;
  }
}
