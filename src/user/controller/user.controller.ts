import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
  HttpCode,
  HttpStatus,
  UnauthorizedException,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiParam,
} from '@nestjs/swagger';
import { UserService } from '../service/user.service';
import { User } from '../schema/user.schema';
import { SignUpDto } from '../dto/sign-up.dto';
import { SignInDto } from '../dto/sign-in.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { SessionService } from 'src/session/service/session.service';
import { MailerService } from 'src/mailer/service/mailer.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private sessionService: SessionService,
    private readonly mailerService: MailerService,
    private readonly jwtService: JwtService,
  ) {}

  // 🔐 REGISTER
  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({
    status: 201,
    description: 'User registered successfully',
    type: User,
  })
  register(@Body() createUserDto: SignUpDto): Promise<User> {
    return this.userService.register(createUserDto);
  }

  // 🔐 LOGIN
  @Post('login')
  async login(@Req() req, @Body() body: { email: string; password: string }) {
    const { email, password } = body;

    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const userAgent = req.headers['user-agent'];

    const isNew = await this.sessionService.isNewSession(
      user.id,
      ip,
      userAgent,
    );

    if (isNew) {
      await this.sessionService.createSession(user.id, ip, userAgent);
      await this.mailerService.sendEmail({
        to: user.email,
        subject: 'New location detected',
        template: 'new-location-detector',
        context: {
          name: user.fullName,
          ip: ip,
          device: userAgent,
          location: 'Unknown', // Optional: Add real location lookup
          time: new Date().toLocaleString(),
        },
      });
    }

    const payload = { sub: user.id, email: user.email };
    const token = this.jwtService.sign(payload);

    return {
      message: isNew ? 'New device login' : 'Known device login',
      token,
      user: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
      },
    };
  }
  // 🧑‍🚀 ME (Requires Auth)
  @Get('me')
  @ApiBearerAuth()
  //   @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get current user info' })
  @ApiResponse({ status: 200, description: 'Current user', type: User })
  async getMe(@Req() req: any): Promise<User> {
    return this.userService.findOne(req.user.id);
  }

  // ✅ CRUD ENDPOINTS

  @Post()
  @ApiOperation({ summary: 'Create a new user (admin only)' })
  @ApiResponse({ status: 201, description: 'User created', type: User })
  create(@Body() createUserDto: SignUpDto): Promise<User> {
    return this.userService.register(createUserDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, type: [User] })
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user by ID' })
  @ApiParam({ name: 'id', type: 'string' })
  @ApiResponse({ status: 200, type: User })
  findOne(@Param('id') id: number): Promise<User> {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update user by ID' })
  @ApiParam({ name: 'id', type: 'string' })
  @ApiResponse({ status: 200, type: User })
  update(
    @Param('id') id: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete user' })
  @ApiParam({ name: 'id', type: 'string' })
  @ApiResponse({ status: 204, description: 'User deleted' })
  remove(@Param('id') id: number): Promise<void> {
    return this.userService.remove(id);
  }
}
